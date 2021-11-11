from flask import Flask, render_template
from database import getAbout

app = Flask(__name__)

@app.route("/")
def renderHome():
    return render_template('home.html')

@app.route("/about")
def renderAbout():    
    return getAbout()