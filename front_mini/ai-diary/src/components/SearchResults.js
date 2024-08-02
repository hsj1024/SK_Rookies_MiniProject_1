import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../SearchResults.css";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery();
  const tag = query.get("tag");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      if (!token) {
        setError("로그인이 필요합니다.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/diaries/search`,
          {
            params: { tag: encodeURIComponent(tag) },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setResults(response.data);
        if (response.data.length === 0) {
          setShowPopup(true);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("검색 결과를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [tag]);

  const handleDiaryClick = (id) => {
    navigate(`/diaries/${id}`);
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate("/search");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="search-results-container">
      <h1>태그 검색 결과</h1>
      <ul className="results-list">
        {results.map((result) => (
          <li key={result.id} onClick={() => handleDiaryClick(result.id)}>
            {result.imageBase64 && (
              <img
                src={`data:image/jpeg;base64,${result.imageBase64}`}
                alt="Diary"
                className="diary-image"
              />
            )}
            <div className="diary-details">
              <h2 className="diary-title">{result.title}</h2>
              <p className="diary-content">
                {result.content.substring(0, 100)}...
              </p>
              <p className="diary-date">
                작성일: {new Date(result.createdAt).toLocaleDateString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <p>검색 결과가 없습니다.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
