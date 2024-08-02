import ssl
import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split

# SSL 인증서 검증 비활성화
ssl._create_default_https_context = ssl._create_unverified_context

# 데이터셋 로드
url = 'https://raw.githubusercontent.com/e9t/nsmc/master/ratings_train.txt'
data = pd.read_csv(url, sep='\t')
data = data.dropna()

# 텍스트 벡터화
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(data['document'])
y = data['label']

# 데이터 분할
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 모델 학습
model = MultinomialNB()
model.fit(X_train, y_train)

# 모델 저장
joblib.dump(model, 'sentiment_model_ko.pkl')
joblib.dump(vectorizer, 'vectorizer_ko.pkl')
