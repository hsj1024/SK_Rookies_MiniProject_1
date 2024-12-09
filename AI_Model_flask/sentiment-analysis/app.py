from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

# 모델 로드
model = joblib.load('sentiment_model_ko.pkl')
vectorizer = joblib.load('vectorizer_ko.pkl')

# 감정 변환 함수
def convert_to_emotion(label):
    return '긍정' if label == 1 else '부정'

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data['text']
    text_tfidf = vectorizer.transform([text])
    prediction = model.predict(text_tfidf)[0]
    emotion = convert_to_emotion(prediction)
    return jsonify({'emotion': emotion})

if __name__ == '__main__':
    app.run(debug=True)
