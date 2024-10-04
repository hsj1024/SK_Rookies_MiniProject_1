package com.example.AI_Diary.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class VerificationCode {

    @Id
    private String userId;
    private String code;

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
