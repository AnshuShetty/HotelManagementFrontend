import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useQuery, useMutation } from "@apollo/client/react";
import { myBookings } from "../../graphql/queries/myBookings";
import PopupModal from "../../components/popupModel/PopupModal";
import { useState } from "react";
import { addReview } from "../../graphql/mutation/addReview";
import { cancelBooking as CANCEL_BOOKING } from "../../graphql/mutation/cancelBooking";

const Booking = () => {
  const { data, loading, error } = useQuery(myBookings);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [submitReview] = useMutation(addReview, {
    onCompleted: () => {
      alert("Review submitted successfully!");
      setModalOpen(false);
      setRating(0);
      setComment("");
    },
    onError: (err) => {
      alert(err.message);
    },
  });
  const [cancelBookingMutation] = useMutation(CANCEL_BOOKING, {
    onCompleted: () => {
      alert("Booking cancelled successfully!");
      window.location.reload();
    },
    onError: (err) => {
      alert(err.message);
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading bookings.</p>;

  const bookings = data?.myBookings || [];

  const handleSubmit = () => {
    if (!rating || !comment.trim()) {
      alert("Please provide a rating and comment.");
      return;
    }

    submitReview({
      variables: {
        input: {
          bookingId: selectedBooking,
          roomId: bookings.find((b) => b.id === selectedBooking)?.room?.id,
          rating,
          comment,
        },
      },
    });
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleReview = (bookingId) => {
    setSelectedBooking(bookingId);
    setModalOpen(true);
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      cancelBookingMutation({
        variables: { cancelBookingId: bookingId },
      });
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>My Bookings</h2>

        {bookings.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "2px solid black" }}>
                <th style={{ padding: "10px", textAlign: "left" }}>
                  Booking ID
                </th>
                <th style={{ padding: "10px", textAlign: "left" }}>Room</th>
                <th style={{ padding: "10px", textAlign: "left" }}>
                  Room Type
                </th>
                <th style={{ padding: "10px", textAlign: "left" }}>
                  Total Price
                </th>
                <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Check In</th>
                <th style={{ padding: "10px", textAlign: "left" }}>
                  Check Out
                </th>
                <th style={{ padding: "10px", textAlign: "left" }}>Review</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px" }}>{booking.id}</td>

                  <td style={{ padding: "10px" }}>
                    {booking.room ? booking.room.number : "Room Deleted"}
                  </td>

                  <td style={{ padding: "10px" }}>
                    {booking.room ? booking.room.type : "Unknown"}
                  </td>

                  <td style={{ padding: "10px" }}>₹{booking.totalPrice}</td>

                  <td style={{ padding: "10px" }}>
                    {booking.status || "Confirmed"}
                  </td>
                  <td style={{ padding: "10px" }}>
                    {booking.checkIn
                      ? new Date(booking.checkIn).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td style={{ padding: "10px" }}>
                    {booking.checkOut
                      ? new Date(booking.checkOut).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    {booking.status === "COMPLETED" && (
                      <button
                        onClick={() => handleReview(booking.id)}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "#4CAF50",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Review
                      </button>
                    )}
                  </td>
                  <td>
                    {booking.status === "CONFIRMED" && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "#e41b1bff",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Cancel Booking
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p
            style={{
              marginTop: "20px",
              fontSize: "18px",
              color: "#000000",
            }}
          >
            No bookings available.
          </p>
        )}
      </div>

      <PopupModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 style={{ marginBottom: "12px" }}>Rate Your Stay</h2>

        {/* ⭐ Rating Stars */}
        <div style={{ marginBottom: "16px" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                fontSize: "30px",
                cursor: "pointer",
                color: star <= rating ? "#FFD700" : "#ccc",
              }}
              onClick={() => handleStarClick(star)}
            >
              ★
            </span>
          ))}
        </div>

        {/* 💬 Comment Input */}
        <textarea
          placeholder="Write your review..."
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            background: "#4caf50",
            color: "white",
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Submit Review
        </button>
      </PopupModal>

      <Footer />
    </>
  );
};

export default Booking;
