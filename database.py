from google.cloud import datastore
from flask import jsonify

client = datastore.Client()

def getData():
    results = {}

    results["about"] = list(client.query(kind="about_description").fetch())
    
    projectQuery = client.query(kind="projects")
    projectQuery.order = ["-year"]
    results["projects"] = list(projectQuery.fetch())

    # Download current 

    return jsonify({"data":results})