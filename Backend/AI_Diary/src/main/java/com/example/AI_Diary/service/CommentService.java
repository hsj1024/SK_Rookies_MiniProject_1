package com.example.AI_Diary.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.AI_Diary.model.Comment;
import com.example.AI_Diary.repository.CommentRepository;

@Service
public class CommentService {
	@Autowired
	private CommentRepository commentRepository;
	
	public Comment saveComment(Comment comment) {
		comment.setCreatedAt(LocalDateTime.now());;
		return commentRepository.save(comment);
	}
	
	public List<Comment> findByDiaryId(Long diaryId) {
		return commentRepository.findByDiaryId(diaryId);
	

	}
	 public Optional<Comment> findById(Long id) {
	        return commentRepository.findById(id);
	    }

    public void deleteById(Long id) {
        commentRepository.deleteById(id);
    }
}