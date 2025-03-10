from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)
VM_CONFIG_FILE = "vm_config.txt"


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/save_vm_config", methods=["POST"])
def save_vm_config():
    data = request.get_json()
    vm_url = data.get("vm_url")

    if vm_url:
        with open(VM_CONFIG_FILE, "w") as f:
            f.write(vm_url)
        return jsonify({"success": True})
    return jsonify({"success": False}), 400


@app.route("/get_vm_config")
def get_vm_config():
    try:
        if os.path.exists(VM_CONFIG_FILE):
            with open(VM_CONFIG_FILE, "r") as f:
                vm_url = f.read().strip()
                return jsonify({"vm_url": vm_url})
    except Exception as e:
        print(f"Error reading VM config: {e}")
    return jsonify({"vm_url": None})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
