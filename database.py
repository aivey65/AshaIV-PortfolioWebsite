from google.cloud import datastore
from flask import jsonify

client = datastore.Client()

def getAbout():
    query = client.query(kind='about_description')
    results = list(query.fetch())
    return jsonify({"data":results})