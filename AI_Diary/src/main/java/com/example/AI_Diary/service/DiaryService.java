package com.example.AI_Diary.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.AI_Diary.model.Comment;
import com.example.AI_Diary.model.Diary;
import com.example.AI_Diary.repository.CommentRepository;
import com.example.AI_Diary.repository.DiaryRepository;

import jakarta.transaction.Transactional;

@Service
public class DiaryService {

    @Autowired
    private DiaryRepository diaryRepository;

    @Autowired
    private CommentRepository commentRepository;

//    public Diary saveDiary(Diary diary) {
//        diary.setCreatedAt(LocalDateTime.now());
//        return diaryRepository.save(diary);
//    }
    @Transactional
    public Diary saveDiary(Diary diary) {
        try {
            // Diary 객체의 tags를 설정할 때, 새 리스트로 교체하지 말고 직접 수정합니다.
            if (diary.getTags() == null) {
                diary.setTags(new ArrayList<>());
            }
            return diaryRepository.save(diary);
        } catch (Exception e) {
            // 예외를 기록하고 적절히 처리합니다.
            e.printStackTrace();
            throw new RuntimeException("일기 저장 중 오류 발생", e);
        }
    }
    public List<Diary> findByUserId(Long userId) {
        return diaryRepository.findByUserId(userId);
    }

    public List<Diary> findByUserIdAndCreatedAtBetween(Long userId, LocalDateTime start, LocalDateTime end) {
        return diaryRepository.findByUserIdAndCreatedAtBetween(userId, start, end);
    }

    public List<Diary> findByUserIdAndTag(Long userId, String tag) {
        return diaryRepository.findByUserIdAndTag(userId, tag);
    }

    public List<Comment> findCommentsByDiaryId(Long diaryId) {
        return commentRepository.findByDiaryId(diaryId);
    }
    @Transactional

    public void deleteCommentsByDiaryId(Long diaryId) {
        commentRepository.deleteByDiaryId(diaryId);
    }

    public void deleteById(Long id) {
        diaryRepository.deleteById(id);
    }

    public Optional<Diary> findById(Long id) {
        return diaryRepository.findById(id);
    }
    
    @Transactional
    public void deleteAllDiariesByUserId(Long userId) {
        List<Diary> diaries = diaryRepository.findByUserId(userId);
        for (Diary diary : diaries) {
            deleteCommentsByDiaryId(diary.getId()); // 일기의 모든 댓글 삭제
            diaryRepository.deleteById(diary.getId()); // 일기 삭제
        }
    }
}
