import requests
from flask import Blueprint, request, jsonify

proxy_routes = Blueprint("proxy", __name__)


@proxy_routes.route("/upload_image", methods=["POST"])
def upload_image():
    image = request.files["image"]
    # api_key = current_app.config["IMG_HIPPO_API_KEY"]
    api_key = "9W1YwT4VSelIHJyR3RYeKKmMlrGGiHJf"

    files = {"file": (image.filename, image.read(), image.content_type)}
    data = {"api_key": api_key}

    res = requests.post("https://www.imghippo.com/v1/upload", files=files, data=data)

    if res.status_code == 200:
        return jsonify(res.json())
    else:
        return jsonify({"error": "Image upload failed"}), res.status_code
