import json
import nltk
from nltk.stem import WordNetLemmatizer
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.preprocessing import LabelEncoder
import numpy as np
import os

nltk.download('punkt')
nltk.download('wordnet')

lemmatizer = WordNetLemmatizer()

def load_data(dataset_path="data/ngo_chatbot_dataset.json"):
    with open(dataset_path) as f:
        data = json.load(f)
    patterns = []
    labels = []
    responses = {}
    for intent in data:
        for pattern in intent["patterns"]:
            tokens = nltk.word_tokenize(pattern.lower())
            tokens = [lemmatizer.lemmatize(w) for w in tokens]
            patterns.append(" ".join(tokens))
            labels.append(intent["intent"])
        responses[intent["intent"]] = intent["responses"]
    return patterns, labels, responses

def preprocess(patterns, labels, num_words=2000):
    tokenizer = Tokenizer(num_words=num_words, oov_token="<OOV>")
    tokenizer.fit_on_texts(patterns)
    sequences = tokenizer.texts_to_sequences(patterns)
    padded = pad_sequences(sequences, padding="post")
    lbl_encoder = LabelEncoder()
    labels_encoded = lbl_encoder.fit_transform(labels)
    return tokenizer, padded, labels_encoded, lbl_encoder
