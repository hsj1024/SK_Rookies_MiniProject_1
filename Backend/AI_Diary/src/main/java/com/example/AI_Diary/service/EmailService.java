package com.example.AI_Diary.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("[ AI 감성일기 ] 비밀번호 재설정 인증 코드");
        message.setText("인증 코드는 " + code + " 입니다. 5분 안에 인증번호를 입력하세요. ");
        mailSender.send(message);
    }
}

