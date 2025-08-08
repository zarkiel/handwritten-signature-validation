
import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

from flask import Flask, request, jsonify, render_template
from tensorflow.keras.models import load_model
from functions import crop_from_xywhn_pil, euclidean_distance, contrastive_loss
from preprocessing import image_from_base64, image_to_base64, preprocess_image_base64, preprocess_image_bytes
from ultralytics import YOLO
import math
from flask_cors import CORS
import torch
import io

device = 'cuda' if torch.cuda.is_available() else 'cpu'

MODEL_PATH = "models/best_model-cedar1.keras"
DETECTOR_PATH = "models/detector_yolo_1cls.pt"
THRESHOLD = 0.15


model = load_model(MODEL_PATH, custom_objects={
    "euclidean_distance": euclidean_distance,
    "contrastive_loss": contrastive_loss
})

detector = YOLO(DETECTOR_PATH)
detector.to(device)

# === Crear app Flask ===
app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

def verify_pair(ref_images, img_verify, cropped=None):
    min_distance = math.inf
    for img_ref in ref_images:
        distance = float(model.predict([img_ref, img_verify])[0][0])
        min_distance = min(min_distance, distance)

    result = min_distance < THRESHOLD
    return {
        "distance": round(min_distance, 4),
        "result": result,
        "cropped": f"data:image/png;base64,{image_to_base64(cropped)}"
    }

def verify_document(ref_images, document_image):
    detect_result = detector.predict(document_image, verbose=False, conf=0.5)[0]
    cropped = None
    for box, cls, conf in zip(detect_result.boxes.xywhn, detect_result.boxes.cls, detect_result.boxes.conf):
        if int(cls) != 0:
            continue   # Skip non-signature detections
        cropped = crop_from_xywhn_pil(document_image, box)
        break
    
    if cropped is None:
        return {"error": "No signature was found in the image."}
    
    img_byte_arr = io.BytesIO()
    cropped.save(img_byte_arr, format='PNG')
    img_verify = preprocess_image_bytes(img_byte_arr.getvalue())

    return verify_pair(ref_images, img_verify, cropped)

@app.route('/verify', methods=['POST'])
def verify_signature():
    data = request.json['data']
    ref_images = []
    result = {"error": "No references have been sent."}

    for ref_image in data['images']:
        header, base64_string = ref_image.split(',')
        img_data = preprocess_image_base64(base64_string)
        ref_images.append(img_data)


    if len(ref_images) == 0:
        return jsonify({"error": "No references have been sent."}), 400

    if data['imageType'] == "document":
        document_image = image_from_base64(data['imageToVerify'].split(',')[1])
        result = verify_document(ref_images, document_image)
    elif data['imageType'] == "signature_only":
        signature_image = image_from_base64(data['imageToVerify'].split(',')[1])
        img_verify = preprocess_image_base64(data['imageToVerify'].split(',')[1])
        result = verify_pair(ref_images, img_verify, signature_image)
    else:
        return jsonify({"error": "Invalid image type"}), 400
    
    if "error" in result:
        return jsonify({"error": result["error"]}), 400

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)