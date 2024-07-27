package com.example.AI_Diary.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SentimentAnalysisService {
    private final RestTemplate restTemplate;

    @Autowired
    public SentimentAnalysisService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String analyzeSentiment(String content) {
        String apiUrl = "http://localhost:5000/predict";
        SentimentRequest request = new SentimentRequest(content);
        SentimentResponse response = restTemplate.postForObject(apiUrl, request, SentimentResponse.class);
        return response != null ? response.getEmotion() : "Unknown";
    }

    public static class SentimentRequest {
        private String text;

        public SentimentRequest(String text) {
            this.text = text;
        }

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }
    }

    public static class SentimentResponse {
        private String emotion;

        public String getEmotion() {
            return emotion;
        }

        public void setEmotion(String emotion) {
            this.emotion = emotion;
        }
    }
}
