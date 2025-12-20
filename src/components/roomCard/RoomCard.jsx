import React, { useEffect } from "react";
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
  useEffect(() => {
    // debug: confirm props received for each card
    // remove or disable in production
    // eslint-disable-next-line no-console
    console.debug("RoomCard rendered:", { id, title, image, isFavorite });
  }, [id, title, image, isFavorite]);

  return (
    <div className="room-card" data-room-id={id || "no-id"}>
      <img
        src={
          image ||
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
        }
        alt={title || "Room image"}
        className="room-img"
        loading="lazy"
      />
      {/* Favorite Icon */}
      <div
        className="favorite-icon"
        onClick={() => {
          if (typeof onToggleFavorite === "function") onToggleFavorite();
        }}
      >
        {isFavorite ? (
          <HeartFilled className="heart filled" />
        ) : (
          <HeartOutline className="heart" />
        )}
      </div>
      <div className="room-details">
        <h3>{title || "Untitled Room"}</h3>
        <p>Type: {description || "—"}</p>
        <p>
          <strong>Price:</strong>{" "}
          {price != null ? `$${price} per night` : "N/A"}
        </p>
        <p>{availability ? "Available" : "Not Available"}</p>
        {/* Check if room is available */}
        <Link to={`/rooms/${id || ""}`} className="btn">
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
