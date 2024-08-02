import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Search.css"; // CSS 파일 임포트

const Search = () => {
  const [tag, setTag] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search-results?tag=${tag}`);
  };

  return (
    <div className="search-container">
      <h1 className="search-title">태그 검색</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <label className="search-label">
          태그:
          <div className="search-input-container">
            <input
              type="text"
              className="search-input"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              required
            />
            <button type="submit" className="search-button">
              검색
            </button>
          </div>
        </label>
      </form>
    </div>
  );
};

export default Search;
