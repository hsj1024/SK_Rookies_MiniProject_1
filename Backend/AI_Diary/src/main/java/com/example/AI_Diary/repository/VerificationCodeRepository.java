package com.example.AI_Diary.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.AI_Diary.model.VerificationCode;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode, String> {
    VerificationCode findByUserIdAndCode(String userId, String code);
}
