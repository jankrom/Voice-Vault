from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import os
from functools import wraps
import lmdb
from werkzeug.utils import secure_filename


app = Flask(__name__)
app.secret_key = os.urandom(24)
VM_CONFIG_FILE = "vm_config.txt"
PASSWORD_FILE = "../password.txt"

# Creating/Opening Song DB
env = lmdb.open('song_db', map_size=10**7)
SONG_FILES = './songs'
os.makedirs(SONG_FILES, exist_ok=True)


def get_stored_password():
    try:
        with open(PASSWORD_FILE, "r") as f:
            return f.read().strip()
    except Exception as e:
        print(f"Error reading password file: {e}")
        return None


def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get("authenticated"):
            return redirect(url_for("login"))
        return f(*args, **kwargs)

    return decorated


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        password = request.form.get("password")
        stored_password = get_stored_password()

        if password == stored_password:
            session["authenticated"] = True
            return redirect(url_for("index"))
        return render_template("login.html", error="Invalid password")

    return render_template("login.html")


@app.route("/")
@requires_auth
def index():
    return render_template("index.html")


@app.route("/save_vm_config", methods=["POST"])
@requires_auth
def save_vm_config():
    data = request.get_json()
    vm_url = data.get("vm_url")

    if vm_url:
        with open(VM_CONFIG_FILE, "w") as f:
            f.write(vm_url)
        return jsonify({"success": True})
    return jsonify({"success": False}), 400


@app.route("/get_vm_config")
@requires_auth
def get_vm_config():
    try:
        if os.path.exists(VM_CONFIG_FILE):
            with open(VM_CONFIG_FILE, "r") as f:
                vm_url = f.read().strip()
                return jsonify({"vm_url": vm_url})
    except Exception as e:
        print(f"Error reading VM config: {e}")
    return jsonify({"vm_url": None})

@app.route("/get_song_names")
@requires_auth
def get_songs():
    try:
        with env.begin() as txn:
            with txn.cursor() as cursor:
                all_song_names = [key.decode('utf-8') for key in cursor.iternext(keys=True, values=False)]
        return jsonify({"song_names": all_song_names})
    except Exception as e:
        print(f"Error returning song names: {e}")
    return jsonify({"song_names": None})

@app.route("/add_song", methods=["POST"])
@requires_auth
def add_song():
    try:
        if 'file' not in request.files or 'name' not in request.form:
            return jsonify({'message': 'File and name are required.'}), 400

        file = request.files['file']
        name = request.form['name']
        if file.filename == '':
            return jsonify({'message': 'No file selected.'}), 400
        
        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(SONG_FILES, filename))
            with env.begin(write=True) as txn:
                txn.put(name.encode('utf-8'), filename.encode('utf-8'))
            return jsonify({'message': f'File "{filename}" successfully uploaded.'}), 200
    except Exception as e:
        print(f"Error returning song names: {e}")
    return jsonify({"song_names": None})

@requires_auth
@app.route('/delete_song/<songName>', methods=['DELETE'])
def delete_song(songName):
    try:
         with env.begin(write=True) as txn:
             filename = txn.get(songName.encode('utf-8')).decode('utf-8')
             if filename:
                 os.remove(os.path.join(SONG_FILES, filename))
                 result = txn.delete(songName.encode('utf-8'))
                 if result:
                     return jsonify({'message': f'File "{songName}" successfully deleted.'}), 200
             return jsonify({'message': f'File "{songName}" not found.'}), 400
            
    except Exception as e:
        print(f"Error deleting song name: {e}")
    return jsonify({'message': 'No file to delete.'}), 400


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
