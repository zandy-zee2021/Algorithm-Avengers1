from flask import Flask, render_template, jsonify, request
from chat import get_response

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('Home.html')

@app.route('/about')
def about():
    return render_template('About.html')

@app.route('/auctions')
def auctions():
    return render_template('Auctions.html')


@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':

        return 'Thank you for contacting us, we\'ll be in touch soon.'
    return render_template('Contact.html')

@app.route('/addToCart')
def addToCart():
    return render_template('add_to_cart.html')

@app.route('/products.json')
def products():
    products = [
        {"id": 1, "name": "White Sheep", "price": 1500, "image": "static/Images/image4.png"},
        {"id": 2, "name": "White Lamb", "price": 1200, "image": "static/Images/image3.png"},
        {"id": 3, "name": "Sulfolk Sheep", "price": 1500, "image": "static/Images/image2.png"},
        {"id": 4, "name": "Hen", "price": 70, "image": "static/Images/image7.png"},
        {"id": 5, "name": "White Chicken", "price": 70, "image": "static/Images/image6.png"},
        {"id": 6, "name": "Cow", "price": 11000, "image": "static/Images/image.png"},
        {"id": 7, "name": "Goat", "price": 2000, "image": "static/Images/download-2.jpeg"},
        {"id": 8, "name": "Calf", "price": 5000, "image": "static/Images/calf.jpeg"},
        {"id": 9, "name": "kid", "price": 1100, "image": "static/Images/babygoat.jpeg"},
        {"id": 10, "name": "chick", "price": 10, "image": "static/Images/chick.jpeg"},
        
    ]
    return jsonify(products)

@app.route('/predict', methods=['POST'])
def predict():
    text = request.get_json().get("message")
    response = get_response(text)
    message = {"answer": response}
    return jsonify(message)

if __name__ == '__main__':
    app.run(debug=True)
