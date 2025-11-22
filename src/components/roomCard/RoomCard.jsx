import React from "react";
import { Link } from "react-router-dom";
import "../roomCard/roomCard.css";

const RoomCard = ({ id, image, title, description, price, availability }) => {
  return (
    <div className="room-card">
      <img src={image} alt={"RoomImage"} className="room-img" />
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
