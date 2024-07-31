# our flask goes in here
from flask import Flask, render_template

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


if __name__ == '__main__':
    app.run(debug=True)
