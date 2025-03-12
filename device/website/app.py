from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import os
from functools import wraps

app = Flask(__name__)
app.secret_key = os.urandom(24)
VM_CONFIG_FILE = "vm_config.txt"
PASSWORD_FILE = "../password.txt"


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


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
