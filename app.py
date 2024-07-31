# our flask goes in here
from flask import Flask, render_template, request, jsonify
from elasticsearch import Elasticsearch
from PIL import Image
import io
import numpy as np
import base64
from twilio.rest import Client
import feature_extractor  # Hypothetical module for feature extraction

app = Flask(__name__)
es = Elasticsearch([{'host': 'localhost', 'port': 9200}])


# Twilio credentials
account_sid = 'YOUR_TWILIO_ACCOUNT_SID'
auth_token = 'YOUR_TWILIO_AUTH_TOKEN'
client = Client(account_sid, auth_token)

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    image = Image.open(file.stream)
    features = feature_extractor.extract(image)  # Use the feature extractor function

    es.index(index='catalog', body={'features': features, 'metadata': {'filename': file.filename}})

    return jsonify({'message': 'Image indexed successfully'}), 200

@app.route('/search', methods=['POST'])
def search_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    image = Image.open(file.stream)
    query_features = feature_extractor.extract(image)  # Use the feature extractor function

    response = es.search(
        index='catalog',
        body={
            'query': {
                'knn': {
                    'field': 'features',
                    'vector': query_features,
                    'k': 10  # Number of similar results to return
                }
            }
        }
    )

    return jsonify(response['hits']['hits']), 200


@app.route('/whatsapp', methods=['POST'])
def whatsapp():
    incoming_msg = request.values.get('Body', '').lower()
    from_number = request.values.get('From', '')

    response_message = 'Hello! How can I help you?'

    # Handle different messages
    if 'hello' in incoming_msg:
        response_message = 'Hi there!'
    elif 'help' in incoming_msg:
        response_message = 'Here is what I can do...'

    # Send response
    message = client.messages.create(
        body=response_message,
        from_='whatsapp:+14155238886',  # Your Twilio WhatsApp number
        to=from_number
    )

    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True)
