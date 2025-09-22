from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense
from preprocessing import load_data, preprocess
import os

patterns, labels, responses = load_data()
tokenizer, X, y, lbl_encoder = preprocess(patterns, labels)

vocab_size = len(tokenizer.word_index) + 1
max_len = X.shape[1]
num_classes = len(set(y))

model = Sequential([
    Embedding(input_dim=vocab_size, output_dim=16, input_length=max_len),
    LSTM(32),
    Dense(32, activation="relu"),
    Dense(num_classes, activation="softmax")
])

model.compile(loss="sparse_categorical_crossentropy", optimizer="adam", metrics=["accuracy"])
model.fit(X, y, epochs=200, batch_size=8)

# Save everything
os.makedirs("model", exist_ok=True)
model.save("model/chatbot_model.h5")

import pickle
import json
with open("model/tokenizer.pkl", "wb") as f:
    pickle.dump(tokenizer, f)
with open("model/label_encoder.pkl", "wb") as f:
    pickle.dump(lbl_encoder, f)
with open("model/responses.json", "w") as f:
    json.dump(responses, f)
