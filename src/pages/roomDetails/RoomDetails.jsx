import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "../roomDetails/roomDetail.css";
import { useQuery } from "@apollo/client/react";
import { getRoom } from "../../graphql/queries/room";
import { getReviews } from "../../graphql/queries/getReviews";

const RoomDetails = () => {
  const { id } = useParams(); // roomId

  // Fetch basic room details
  const {
    loading: roomLoading,
    error: roomError,
    data: roomData,
  } = useQuery(getRoom, {
    variables: { roomId: id },
  });

  // Fetch reviews
  const {
    loading: reviewLoading,
    error: reviewError,
    data: reviewData,
  } = useQuery(getReviews, {
    variables: { roomId: id },
  });

  if (roomLoading || reviewLoading) return <p>Loading room details...</p>;
  if (roomError) return <p>Error fetching room: {roomError.message}</p>;
  if (reviewError) return <p>Error fetching reviews: {reviewError.message}</p>;

  const room = roomData?.room;
  const reviews = reviewData?.getReviews || [];

  if (!room) {
    return (
      <div>
        <h1>No Room Found</h1>
        <p>We couldn't find any details for this room.</p>
      </div>
    );
  }

  // ⭐ Calculate average rating
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : null;

  return (
    <>
      <Navbar />

      <div className="room-details-container">
        <h1>Room Details</h1>

        <div className="room-details-card">
          {/* Image */}
          {room.images?.[0] && (
            <img
              src={room.images[0]}
              alt={`Room ${room.number}`}
              className="room-details-img"
            />
          )}

          <h3>Room {room.number}</h3>
          <p>Type: {room.type}</p>
          <p>
            <strong>Amenities:</strong> {room.amenities?.join(", ") || "None"}
          </p>
          <p>
            <strong>Price:</strong> ₹{room.pricePerNight} per night
          </p>

          {/* ⭐ Average Rating */}
          <div style={{ marginTop: "10px", marginBottom: "14px" }}>
            <h3>⭐ Ratings</h3>
            {avgRating ? (
              <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                {avgRating} / 5 ⭐ ({reviews.length} review
                {reviews.length > 1 ? "s" : ""})
              </p>
            ) : (
              <p>No ratings yet</p>
            )}
          </div>

          {/* Booking Button */}
          <Link
            to="/payment"
            state={{
              id: room.id,
              number: room.number,
              price: room.pricePerNight,
              type: room.type,
            }}
            className="btn"
          >
            Proceed to Booking
          </Link>
        </div>

        {/* --------------------- REVIEWS SECTION --------------------- */}
        <div className="reviews-section" style={{ marginTop: "40px" }}>
          <h2>Guest Reviews</h2>

          {reviews.length === 0 ? (
            <p>No reviews for this room yet.</p>
          ) : (
            <div className="reviews-list">
              {reviews.map((rev) => (
                <div key={rev.id} className="review-card">
                  <p style={{ fontWeight: "bold" }}>
                    👤 {rev.user?.name || "Guest"}
                  </p>

                  {/* ⭐ Star rating */}
                  <div style={{ marginBottom: "5px" }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: "20px",
                          color: i < rev.rating ? "#FFD700" : "#ccc",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p>{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default RoomDetails;
