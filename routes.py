from flask import Flask, render_template
from database import getData

app = Flask(__name__)

@app.route("/")
def renderHome():
    return render_template('home.html')

@app.route("/load-data")
def loadDatabaseData():    
    return getData()