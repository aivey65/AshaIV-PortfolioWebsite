import google.cloud.datastore as datastore
from flask import jsonify

client = datastore.Client()

def getData():
    results = {}

    results["about"] = list(client.query(kind="about_description").fetch())
    
    projectQuery = client.query(kind="projects")
    projectQuery.order = ["projectNum"]
    results["projects"] = list(projectQuery.fetch())

    skillsQuery = client.query(kind="about_skills")
    skillsQuery.order = ['-skillValue']
    results["skills"] = list(skillsQuery.fetch())

    return jsonify({"data":results})

def getProject(projectID):
    results = {}
    
    projectQuery = client.query(kind="projects")
    projectQuery.add_filter("projectNum", "=", projectID)
    results["project"] = list(projectQuery.fetch())

    return jsonify({"data":results})