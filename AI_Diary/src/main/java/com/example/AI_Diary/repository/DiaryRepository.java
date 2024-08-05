package com.example.AI_Diary.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.AI_Diary.model.Diary;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    List<Diary> findByUserId(Long userId);
    List<Diary> findByUserIdAndCreatedAtBetween(Long userId, LocalDateTime start, LocalDateTime end);
    List<Diary> findByUserIdAndTagsContaining(Long userId, String tag);

    @Query(value = "SELECT d.* FROM diary d JOIN diary_tags t ON d.id = t.diary_id WHERE d.user_id = :userId AND t.tag = :tag", nativeQuery = true)
    List<Diary> findByUserIdAndTag(@Param("userId") Long userId, @Param("tag") String tag);
}
