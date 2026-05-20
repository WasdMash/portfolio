from flask import Flask, request, jsonify
from flask_cors import CORS
import resend, os

app = Flask(__name__)
CORS(app, origins=[os.environ.get("ALLOWED_ORIGIN", "http://localhost:5173")])  # your Vite dev URL

resend.api_key = os.environ.get("RESEND_API_KEY")

@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not all([name, email, message]):
        return jsonify({"error": "Missing fields"}), 400

    resend.Emails.send({
        "from": "portfolio@yourdomain.com",
        "to": "you@youremail.com",        # where you want to receive emails
        "subject": f"Portfolio message from {name}",
        "html": f"<p><strong>From:</strong> {name} ({email})</p><p>{message}</p>"
    })

    return jsonify({"success": True})

if __name__ == "__main__":
    app.run(port=5000)