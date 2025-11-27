import React from "react";
import { Link } from "react-router-dom";
import "../roomCard/roomCard.css";

// added: inline SVG heart components to avoid needing react-icons
const HeartFilled = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const HeartOutline = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z" />
  </svg>
);

const RoomCard = ({
  id,
  image,
  title,
  description,
  price,
  availability,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="room-card">
      <img src={image} alt={"RoomImage"} className="room-img" />
      {/* Favorite Icon */}
      <div className="favorite-icon" onClick={() => onToggleFavorite(id)}>
        {isFavorite ? (
          <HeartFilled className="heart filled" />
        ) : (
          <HeartOutline className="heart" />
        )}
      </div>
      <div className="room-details">
        <h3>{title}</h3>
        <p>Type: {description}</p>
        <p>
          <strong>Price:</strong> ${price} per night
        </p>
        <p>{availability ? "Available" : "Not Available"}</p>{" "}
        {/* Check if room is available */}
        <Link to={`/rooms/${id}`} className="btn">
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
