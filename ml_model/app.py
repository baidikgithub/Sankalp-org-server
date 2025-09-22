from flask import Flask, request, jsonify
from flask_cors import CORS
from src.inference import chatbot_response

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "")
    if not user_message:
        return jsonify({"response": "Please type a message."})
    bot_reply = chatbot_response(user_message)
    return jsonify({"response": bot_reply})

if __name__ == "__main__":
    app.run(port=5001, debug=True)
