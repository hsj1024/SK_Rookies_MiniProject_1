package com.example.AI_Diary.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.AI_Diary.model.Comment;
import com.example.AI_Diary.model.User;
import com.example.AI_Diary.service.CommentService;
import com.example.AI_Diary.service.UserService;
import com.example.AI_Diary.util.JwtTokenUtil;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping
    public ResponseEntity<Comment> createComment(
            @RequestBody Comment comment,
            @RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7); // Bearer 토큰 제거
        String userId = jwtTokenUtil.getUsernameFromToken(jwtToken);
        User user = userService.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        comment.setUser(user);
        comment.setName(user.getName()); // 사용자 이름 설정
        comment.setCreatedAt(LocalDateTime.now());
        Comment savedComment = commentService.saveComment(comment);

        // 사용자 정보와 함께 반환
        return ResponseEntity.ok(savedComment);
    }

    @PostMapping("/reply/{parentId}")
    public ResponseEntity<Comment> createReply(
            @PathVariable Long parentId,
            @RequestBody Comment comment,
            @RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7); // Bearer 토큰 제거
        String userId = jwtTokenUtil.getUsernameFromToken(jwtToken);
        User user = userService.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment parentComment = commentService.findById(parentId)
                .orElseThrow(() -> new RuntimeException("Parent comment not found"));

        comment.setUser(user);
        comment.setName(user.getName()); // 사용자 이름 설정
        comment.setCreatedAt(LocalDateTime.now());
        comment.setParent(parentComment); // 부모 댓글 설정
        Comment savedComment = commentService.saveComment(comment);

        // 사용자 정보와 함께 반환
        return ResponseEntity.ok(savedComment);
    }

    @GetMapping("/diary/{diaryId}")
    public ResponseEntity<List<Comment>> getCommentsByDiary(@PathVariable Long diaryId) {
        List<Comment> comments = commentService.findByDiaryId(diaryId);
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7); // Bearer 토큰 제거
        String userId = jwtTokenUtil.getUsernameFromToken(jwtToken);
        User user = userService.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = commentService.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!comment.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 삭제 권한이 없는 경우
        }

        // Check if the comment is a parent comment
        if (comment.getReplies() != null && !comment.getReplies().isEmpty()) {
            // If it is a parent comment, delete all replies first
            for (Comment reply : comment.getReplies()) {
                commentService.deleteById(reply.getId());
            }
        }

        commentService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}