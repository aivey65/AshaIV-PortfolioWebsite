# AshaIV: My Portfolio Website

This is Asha Ivey's portfolio website with details about her and the projects she has worked on. 

## Development Workflow
### Create a Virtual Environment & Install Requirements
> python -m venv venv

> source venv/Scripts/activate

> pip install -r requirements.txt

### Run the Application
Tell Flask where your app code is:
> export FLASK_APP=main

This application now uses a static json file for the data. It used to use Google Cloud Datastore, but it became unnecessary as I made less and less changes to my portfolio. I will probably revisit the possibility of having a user portal to more easily update details, perhaps switching over to Django, but for now, this setup suits my needs.

### [OLD] Run the Application
To test the website locally, you would need credentials for a service account with Google Cloud Datastore. You would need to set the credentials in the terminal, where "KEY_PATH" is the location of the credentials json file:

> export GOOGLE_APPLICATION_CREDENTIALS="KEY_PATH"

You also need to make sure that Flask knows where your app code is. You need to specify the file name of the flask app:

> export FLASK_APP=main

## Redeploying App
To deploy/redeploy the flask app, follow the steps below in your terminal, at the location of your app.

1. Login to Google Cloud. It will redirect you to a browser page where you can login with Google. Use this command:
> gcloud auth login

2. If you need to change the selected project, using the following with the correct project name:
> gcloud config set project "PROJECT NAME"

3. Deploy the app using the following:
> gcloud app deploy
