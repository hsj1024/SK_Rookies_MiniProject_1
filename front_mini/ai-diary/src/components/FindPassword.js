// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const FindPassword = () => {
//   const [userId, setUserId] = useState("");
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [verificationCode, setVerificationCode] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [showVerificationForm, setShowVerificationForm] = useState(false);
//   const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
//   const [resetSuccessful, setResetSuccessful] = useState(false);
//   const [timer, setTimer] = useState(300); // 5분

//   useEffect(() => {
//     let interval = null;
//     if (showVerificationForm && timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prevTimer) => prevTimer - 1);
//       }, 1000);
//     } else if (timer === 0) {
//       clearInterval(interval);
//       setShowVerificationForm(false);
//       setMessage("인증 시간이 만료되었습니다. 다시 시도해주세요.");
//     }
//     return () => clearInterval(interval);
//   }, [showVerificationForm, timer]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const requestData = { userId, email, name };
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/auth/find-password",
//         requestData
//       );
//       setMessage(response.data);
//       setShowVerificationForm(true);
//       setTimer(300);
//     } catch (error) {
//       if (error.response && error.response.status === 404) {
//         setMessage("해당 사용자가 존재하지 않습니다.");
//       } else {
//         setMessage(
//           `Error: ${error.response ? error.response.data : error.message}`
//         );
//       }
//     }
//   };

//   const handleVerifyCode = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/auth/verify-code",
//         { userId, verificationCode }
//       );
//       setMessage(response.data);
//       setShowVerificationForm(false);
//       setShowResetPasswordForm(true);
//     } catch (error) {
//       setMessage(
//         `Error: ${error.response ? error.response.data : error.message}`
//       );
//     }
//   };

//   const handleResetPassword = async () => {
//     if (newPassword !== confirmPassword) {
//       setMessage("비밀번호가 일치하지 않습니다.");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         "http://localhost:8080/api/auth/reset-password",
//         { userId, email, newPassword }
//       );
//       setMessage(response.data);
//       setShowResetPasswordForm(false);
//       setResetSuccessful(true);
//     } catch (error) {
//       setMessage(
//         `Error: ${error.response ? error.response.data : error.message}`
//       );
//     }
//   };

//   return (
//     <div>
//       {!showVerificationForm && !showResetPasswordForm && !resetSuccessful && (
//         <form onSubmit={handleSubmit}>
//           <h1>비밀번호 찾기</h1>
//           <label>
//             사용자 아이디:
//             <input
//               type="text"
//               value={userId}
//               onChange={(e) => setUserId(e.target.value)}
//               required
//             />
//           </label>
//           <label>
//             이메일:
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </label>
//           <label>
//             이름:
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </label>
//           <button type="submit">비밀번호 찾기</button>
//         </form>
//       )}

//       {showVerificationForm && (
//         <div>
//           <h1>인증 코드 입력</h1>
//           <p>
//             남은 시간: {Math.floor(timer / 60)}:
//             {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
//           </p>
//           <label>
//             인증 코드:
//             <input
//               type="text"
//               value={verificationCode}
//               onChange={(e) => setVerificationCode(e.target.value)}
//               required
//             />
//           </label>
//           <button type="button" onClick={handleVerifyCode}>
//             인증 코드 확인
//           </button>
//         </div>
//       )}

//       {showResetPasswordForm && (
//         <div>
//           <h1>비밀번호 재설정</h1>
//           <label>
//             새로운 비밀번호:
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//             />
//           </label>
//           <label>
//             비밀번호 확인:
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </label>
//           <button type="button" onClick={handleResetPassword}>
//             비밀번호 재설정하기
//           </button>
//         </div>
//       )}

//       {resetSuccessful && (
//         <div>
//           <h1>비밀번호 재설정이 완료되었습니다.</h1>
//           <p>다시 로그인 해주세요.</p>
//           <button onClick={() => (window.location.href = "/")}>
//             홈으로 가기
//           </button>
//         </div>
//       )}

//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default FindPassword;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../FindPassword.css";

const FindPassword = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
  const [resetSuccessful, setResetSuccessful] = useState(false);
  const [timer, setTimer] = useState(300); // 5분

  useEffect(() => {
    let interval = null;
    if (showVerificationForm && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setShowVerificationForm(false);
      setMessage("인증 시간이 만료되었습니다. 다시 시도해주세요.");
    }
    return () => clearInterval(interval);
  }, [showVerificationForm, timer]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowVerificationForm(true);
    setTimer(300);

    const requestData = { userId, email, name };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/find-password",
        requestData
      );
      setMessage(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage("해당 사용자가 존재하지 않습니다.");
      } else {
        setMessage(
          `Error: ${error.response ? error.response.data : error.message}`
        );
      }
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/verify-code",
        { userId, verificationCode }
      );
      setMessage(response.data);
      setShowVerificationForm(false);
      setShowResetPasswordForm(true);
    } catch (error) {
      setMessage(
        `Error: ${error.response ? error.response.data : error.message}`
      );
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8080/api/auth/reset-password",
        { userId, email, newPassword }
      );
      setMessage(response.data);
      setShowResetPasswordForm(false);
      setResetSuccessful(true);
    } catch (error) {
      setMessage(
        `Error: ${error.response ? error.response.data : error.message}`
      );
    }
  };

  return (
    <div className="find-password-container">
      {!showVerificationForm && !showResetPasswordForm && !resetSuccessful && (
        <form onSubmit={handleSubmit} className="find-password-form">
          <h1>비밀번호 찾기</h1>
          <label>
            아이디:
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </label>
          <label>
            이름:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            이메일:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button type="submit">비밀번호 찾기</button>
        </form>
      )}

      {showVerificationForm && (
        <div className="verification-form">
          <h1>인증 코드 입력</h1>
          <p>
            남은 시간: {Math.floor(timer / 60)}:
            {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
          </p>
          <label>
            인증 코드:
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </label>
          <button type="button" onClick={handleVerifyCode}>
            인증 코드 확인
          </button>
        </div>
      )}

      {showResetPasswordForm && (
        <div className="reset-password-form">
          <h1>비밀번호 재설정</h1>
          <label>
            새로운 비밀번호:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
          <label>
            비밀번호 확인:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button type="button" onClick={handleResetPassword}>
            비밀번호 재설정하기
          </button>
        </div>
      )}

      {resetSuccessful && (
        <div className="success-message">
          <h1>비밀번호 재설정이 완료되었습니다.</h1>
          <p>다시 로그인 해주세요.</p>
          <button onClick={() => (window.location.href = "/")}>
            홈으로 가기
          </button>
        </div>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default FindPassword;
