import React, { useState } from "react";

const Review = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please give a rating!");
      return;
    }
    if (onSubmit) onSubmit({ rating, reviewText });
    setRating(0);
    setReviewText("");
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h3>Write a Review</h3>

      {/* ⭐ Rating */}
      <div style={{ fontSize: "28px", marginBottom: "10px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              cursor: "pointer",
              color: (hover || rating) >= star ? "#f4b400" : "#ccc",
              marginRight: "5px",
            }}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        ))}
      </div>

      {/* ✍️ Review Text */}
      <textarea
        placeholder="Write your review here..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        style={{
          width: "100%",
          height: "100px",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "15px",
        }}
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "12px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Submit Review
      </button>
    </div>
  );
};

export default Review;
