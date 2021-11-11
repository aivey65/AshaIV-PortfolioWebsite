from google.cloud import datastore
from flask import jsonify

client = datastore.Client()

def getData():
    results = {}

    results["about"] = list(client.query(kind="about_description").fetch())
    results["projects"] = list(client.query(kind="projects").fetch())

    return jsonify({"data":results})