from flask import jsonify
import json

def readDataFile():
    with open("data.json") as jsonFile:
        data = json.load(jsonFile)
        return data

def getData():
    data = readDataFile()
    
    results = {}
    results["about"] = data["about_description"]
    results["projects"] = data["projects"]
    results["skills"] = data["about_skills"]

    return jsonify({"data":results})

def getProject(projectID):
    data = readDataFile()
    results = {}

    for project in data["projects"]:
        if project["projectNum"] == projectID:
            results["project"] = project
    
    return jsonify({"data":results})