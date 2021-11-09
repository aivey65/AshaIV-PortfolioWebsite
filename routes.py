from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/")
def renderHome():
    return render_template('home.html')