import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../MyPage.css";
import defaultProfileImage from "../assets/프로필테스트1.jpeg";

const MyPage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [userData, setUserData] = useState({
    userId: "",
    name: "",
    email: "",
    joinedDate: "",
    profileImagePath: defaultProfileImage,
  });
  const [loading, setLoading] = useState(true);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [deleteName, setDeleteName] = useState("");
  const [deleteEmail, setDeleteEmail] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (user) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`; // JWT 토큰 포함
      axios
        .get(`/api/users/${user.userId}`)
        .then((response) => {
          setUserData((prevData) => ({
            ...prevData,
            ...response.data,
            profileImagePath:
              response.data.profileImagePath || defaultProfileImage,
          }));
          setLoading(false); // 데이터를 성공적으로 로드한 후 loading 상태를 false로 변경
        })
        .catch((error) => {
          console.error(error);
          setLoading(false); // 오류가 발생한 경우에도 loading 상태를 false로 변경
        });
    }
  }, [user]);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const GoToHome = () => {
    navigate("/");
  };

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append("profileImage", profileImage);

    axios
      .put(`/api/users/${user.userId}/upload-profile-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("프로필 사진이 업로드되었습니다.");
        setUserData((prevData) => ({
          ...prevData,
          profileImagePath: `${response.data.profileImagePath}`,
        }));
        setShowImageUpload(false);
      })
      .catch((error) => {
        console.error(
          "프로필 사진 업로드 실패:",
          error.response || error.message
        );
        alert("프로필 사진 업로드에 실패했습니다.");
      });
  };

  const handleDeleteAccount = () => {
    if (!deleteUserId || !deleteName || !deleteEmail || !deletePassword) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    axios
      .delete(`/api/auth/users/${user.userId}`, {
        data: {
          userId: deleteUserId,
          name: deleteName,
          email: deleteEmail,
          password: deletePassword,
        },
      })
      .then(() => {
        alert("회원 탈퇴가 완료되었습니다.");
        logout();
        navigate("/");
      })
      .catch((error) => {
        alert(
          "회원 탈퇴에 실패했습니다. 아이디, 이름, 이메일 또는 비밀번호를 확인해주세요."
        );
      });
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const toggleImageUpload = () => {
    setShowImageUpload(!showImageUpload);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mypage-container">
      <div className="profile-image-section">
        <div className="profile-image">
          <img
            src={userData.profileImagePath || defaultProfileImage}
            alt="pro"
          />
        </div>
        <p className="username">{userData.name} 님</p> {/* 이름을 표시 */}
        <button onClick={toggleImageUpload}>
          {showImageUpload ? "취소" : "프로필 사진 변경"}
        </button>
        {showImageUpload && (
          <div className="profile-image-upload show">
            <label htmlFor="profileImage">프로필 사진 선택:</label>
            <input type="file" id="profileImage" onChange={handleImageChange} />
            <button onClick={handleImageUpload}>업로드</button>
          </div>
        )}
      </div>
      <div className="profile-info">
        <p>이름: {userData.name}</p>
        <p>아이디: {userData.userId}</p>
        <p>이메일: {userData.email}</p>
        <p>가입 날짜: {userData.joinedDate}</p>
      </div>
      <div className="delete-account-button">
        <button onClick={openDeleteModal}>회원 탈퇴</button>
      </div>
      <button onClick={GoToHome}>홈으로</button>

      {showDeleteModal && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <h2>회원 탈퇴</h2>
            <label>
              아이디:
              <input
                type="text"
                value={deleteUserId}
                onChange={(e) => setDeleteUserId(e.target.value)}
              />
            </label>
            <label>
              이름:
              <input
                type="text"
                value={deleteName}
                onChange={(e) => setDeleteName(e.target.value)}
              />
            </label>
            <label>
              이메일:
              <input
                type="email"
                value={deleteEmail}
                onChange={(e) => setDeleteEmail(e.target.value)}
              />
            </label>
            <label>
              비밀번호:
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
              />
            </label>
            <button onClick={handleDeleteAccount}>회원 탈퇴</button>
            <button onClick={closeDeleteModal}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
