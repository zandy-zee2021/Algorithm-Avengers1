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

@app.route('/shop')
def shop():
    return render_template('Shop.html')

@app.route('/contact')
def contact():
    return render_template('Contact.html')

@app.route('/addToCart')
def addToCart():
    return render_template('add_to_cart.html')

@app.route('/predict', methods=['POST'])
def predict():
    text = request.get_json().get("message")
    response = get_response(text)
    message = {"answer": response}
    return jsonify(message)

if __name__ == '__main__':
    app.run(debug=True)
