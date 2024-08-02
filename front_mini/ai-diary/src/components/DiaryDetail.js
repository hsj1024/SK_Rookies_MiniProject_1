import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../services/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import "../DiaryDetail.css";

const DiaryDetail = () => {
  const [diary, setDiary] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyComment, setReplyComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState(""); // 태그 입력 상태 초기화
  const [image, setImage] = useState(null);
  const [date, setDate] = useState("");
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiary = async () => {
      if (user) {
        try {
          const response = await axiosInstance.get(`/api/diaries/${id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setDiary(response.data);
          setTitle(response.data.title);
          setContent(response.data.content);
          setTags(response.data.tags || []); // 배열로 처리
          setImage(response.data.imageBase64);
          setDate(response.data.createdAt.split("T")[0]);
        } catch (error) {
          console.error("일기 조회 실패:", error);
        }
      } else {
        console.warn("사용자 정보가 없습니다.");
      }
    };

    const fetchComments = async () => {
      if (user) {
        try {
          const response = await axiosInstance.get(
            `/api/comments/diary/${id}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setComments(response.data);
        } catch (error) {
          console.error("댓글 조회 실패:", error);
        }
      } else {
        console.warn("사용자 정보가 없습니다.");
      }
    };

    fetchDiary();
    fetchComments();
  }, [user, id]);

  const handleDelete = async () => {
    if (window.confirm("일기를 삭제하시겠습니까?")) {
      try {
        await axiosInstance.delete(`/api/diaries/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        navigate("/diaries");
      } catch (error) {
        console.error("일기 삭제 실패:", error);
      }
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (window.confirm("일기를 수정하시겠습니까?")) {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("tags", JSON.stringify(tags)); // 태그 배열을 JSON 문자열로 변환하여 전송
        formData.append("createdAt", new Date(date).toISOString());
        if (image) {
          formData.append("image", image);
        }

        const response = await axiosInstance.put(
          `/api/diaries/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setDiary(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
        setTags(response.data.tags || []);
        setImage(response.data.imageBase64);
        setDate(response.data.createdAt.split("T")[0]);
        setIsEditing(false);
      } catch (error) {
        console.error(
          "일기 수정 실패:",
          error.response || error.message || error
        );
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (user && user.userId) {
      try {
        await axiosInstance.post(
          `/api/comments`,
          {
            content: newComment,
            diary: { id: diary.id },
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setNewComment("");
        const commentsResponse = await axiosInstance.get(
          `/api/comments/diary/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("댓글 작성 실패:", error);
      }
    } else {
      console.warn("사용자 정보가 없습니다.");
    }
  };

  const handleReplySubmit = async (e, parentId) => {
    e.preventDefault();
    if (user && user.userId) {
      try {
        await axiosInstance.post(
          `/api/comments/reply/${parentId}`,
          {
            content: replyComment,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setReplyComment("");
        setReplyingTo(null);
        const commentsResponse = await axiosInstance.get(
          `/api/comments/diary/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("답글 작성 실패:", error);
      }
    } else {
      console.warn("사용자 정보가 없습니다.");
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        await axiosInstance.delete(`/api/comments/${commentId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setComments(comments.filter((comment) => comment.id !== commentId));
      } catch (error) {
        console.error("댓글 삭제 실패:", error);
      }
    }
  };

  const handleReplyDelete = async (replyId, parentId) => {
    if (window.confirm("대댓글을 삭제하시겠습니까?")) {
      try {
        await axiosInstance.delete(`/api/comments/${replyId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        // 댓글 상태 업데이트
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === parentId
              ? {
                  ...comment,
                  replies: (comment.replies || []).filter(
                    (reply) => reply.id !== replyId
                  ),
                }
              : comment
          )
        );
      } catch (error) {
        console.error("대댓글 삭제 실패:", error);
      }
    }
  };

  const handleImageDownload = async () => {
    if (window.confirm("이미지를 다운로드 하시겠습니까?")) {
      try {
        const response = await axiosInstance.get(
          `/api/diaries/image/${diary.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            responseType: "blob",
          }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.jpg");
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error("이미지 다운로드 실패:", error);
      }
    }
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag.length > 1 && !tags.includes(newTag)) {
        setTags([...tags, newTag]); // 배열에 태그 추가
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((tag, i) => i !== index));
  };

  const renderTags = () => {
    return tags.map((tag, index) => (
      <div key={index} className="tag">
        {tag} <button onClick={() => handleRemoveTag(index)}>x</button>
      </div>
    ));
  };

  const renderComments = (comments) => {
    return (
      <ul>
        {Array.isArray(comments) &&
          comments.map((comment) => (
            <li key={comment.id} className="comment">
              <div className="comment-header">
                <span className="comment-author">{comment.name}</span>
                <span className="comment-date">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="comment-content">{comment.content}</p>
              <div className="comment-actions">
                <button onClick={() => setReplyingTo(comment.id)}>
                  답글 달기
                </button>
                <button onClick={() => handleCommentDelete(comment.id)}>
                  삭제
                </button>
              </div>
              {replyingTo === comment.id && (
                <form onSubmit={(e) => handleReplySubmit(e, comment.id)}>
                  <label>
                    답글 작성:
                    <textarea
                      value={replyComment}
                      onChange={(e) => setReplyComment(e.target.value)}
                      required
                    />
                  </label>
                  <button type="submit">답글 작성</button>
                </form>
              )}
              {comment.replies && comment.replies.length > 0 && (
                <div className="replies">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="reply">
                      <div className="comment-header">
                        <span className="comment-author">{reply.name}</span>
                        <span className="comment-date">
                          {new Date(reply.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="comment-content">{reply.content}</p>
                      <div className="comment-actions">
                        <button
                          onClick={() =>
                            handleReplyDelete(reply.id, comment.id)
                          }
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
      </ul>
    );
  };

  return (
    <div className="diary-detail-container">
      {diary ? (
        isEditing ? (
          <div>
            <h1 className="diary-detail-title">일기 수정</h1>
            <form onSubmit={handleEdit}>
              <label className="diary-content-title">
                제목:
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label className="diary-content">
                내용:
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </label>
              <label className="diary-tags">
                태그:
                <div className="tags-input-container">
                  {renderTags()}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    onKeyDown={handleTagInputKeyDown}
                    placeholder="태그 입력 후 Enter"
                  />
                </div>
              </label>
              <label className="diary-date">
                날짜:
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </label>
              <label className="diary-image">
                이미지:
                <input type="file" onChange={handleImageChange} />
              </label>
              <button type="submit">수정 완료</button>
              <button type="button" onClick={handleCancelClick}>
                취소
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h1 className="diary-detail-title">{diary.title}</h1>
            <p className="diary-date">
              <hr></hr>
              <br></br>
              날짜: {new Date(diary.createdAt).toLocaleDateString()}
              <br></br>
            </p>
            <br></br>
            <p className="diary-tags">감정: {diary.emotion}</p>
            <p className="diary-tags">
              태그: {diary.tags && diary.tags.join(", ")}
            </p>
            <br></br>

            <p className="diary-content">내용: {diary.content}</p>

            {diary.imageBase64 && (
              <img
                src={`data:image/jpeg;base64,${diary.imageBase64}`}
                alt="Diary"
                className="clickable-image"
                onClick={handleImageDownload}
              />
            )}
            <br></br>
            <div className="button-container-right">
              <button onClick={handleEditClick}>수정</button>
              <button onClick={handleDelete}>삭제</button>
            </div>
            <h2 className="diary-detail-title">댓글</h2>
            <div className="comment-container">{renderComments(comments)}</div>
            <form onSubmit={handleCommentSubmit}>
              <label>
                댓글 작성:
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                />
              </label>
              <div className="button-container-right">
                <button type="submit">댓글 작성</button>
                <button onClick={() => navigate("/")}>홈으로</button>
              </div>
            </form>
          </div>
        )
      ) : (
        <p>일기를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default DiaryDetail;
