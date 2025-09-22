from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle, json
import numpy as np
import random

# Load model & utilities
model = load_model("model/chatbot_model.h5")
with open("model/tokenizer.pkl", "rb") as f:
    tokenizer = pickle.load(f)
with open("model/label_encoder.pkl", "rb") as f:
    lbl_encoder = pickle.load(f)
with open("model/responses.json") as f:
    responses = json.load(f)

def chatbot_response(text):
    seq = tokenizer.texts_to_sequences([text.lower()])
    padded_seq = pad_sequences(seq, maxlen=model.input_shape[1], padding="post")
    pred = model.predict(padded_seq)
    intent = lbl_encoder.inverse_transform([np.argmax(pred)])
    return random.choice(responses[intent[0]])
