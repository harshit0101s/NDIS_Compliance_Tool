from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore
import os
import google.generativeai as genai

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Set Gemini API key from .env
gemini_api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=gemini_api_key) 

# Initialize Firebase from credentials path in .env
firebase_path = os.getenv("FIREBASE_CREDENTIALS_PATH")

if not firebase_admin._apps:
    cred = credentials.Certificate(firebase_path)
    firebase_admin.initialize_app(cred)

# Connect to Firestore
db = firestore.client()

client_folder = os.path.join(os.getcwd(),"..","client")
dist_folder = os.path.join(client_folder,"dist")

#Server static files from the "dist" folder under the client directory
@app.route('/',defaults={"filename":""})
@app.route('/<path:filename>')
def index(filename):
    if not filename:
        filename = "index.html"
    return send_from_directory(dist_folder,filename)



@app.route('/generate_policy', methods=['POST'])
def generate_policy():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    service_type = data.get("serviceType")

    # Save form data to Firebase
    db.collection("ndis_users").add({
        "name": name,
        "email": email,
        "serviceType": service_type
    })

    # Generate policy with Gemini
    prompt = f"""
    Generate a concise Participant Rights Policy for a NDIS service provider offering '{service_type}' services.
    The policy should be between 50 to 70 words, with no placeholders like [Service Provider Name].
    The text should be clear, direct, and include the core participant rights such as safety, dignity, and choice, without any additional formatting or examples.
    """

    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        policy = response.text
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"policy": policy})

if __name__ == '__main__':
    app.run(debug=True, port=5050)
