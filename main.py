from flask import Flask, redirect, render_template
from database import getData, getProject

app = Flask(__name__, template_folder="templates")

@app.route("/")
def renderHome():
    return render_template('index.html')

@app.route("/<scrollTo>")
def renderHomeScroll(scrollTo):
    return render_template('index.html', scroll=scrollTo)

@app.route("/project/<projectID>", methods=['GET','POST'])
def renderProjectInfo(projectID):
    return render_template('project_info.html')

# Funtions to get data
@app.route("/load-data/<projectID>")
def loadProjectData(projectID):    
    return getProject(projectID)

@app.route("/load-data")
def loadDatabaseData():    
    return getData()