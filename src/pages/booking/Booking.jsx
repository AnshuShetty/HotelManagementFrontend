import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useQuery } from "@apollo/client/react";
import { myBookings } from "../../graphql/queries/myBookings";

const Booking = () => {
  const { data, loading, error } = useQuery(myBookings);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading bookings.</p>;

  const bookings = data?.myBookings || [];

  const handleReview = (bookingId) => {
    // open the review modal
    alert(`Open review modal for booking ID: ${bookingId}`);
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
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px" }}>{booking.id}</td>

                  <td style={{ padding: "10px" }}>
                    {booking.room?.number ?? "N/A"}
                  </td>

                  <td style={{ padding: "10px" }}>
                    {booking.room?.type ?? "N/A"}
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
                    {booking.status === "CONFIRMED" && (
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

      <Footer />
    </>
  );
};

export default Booking;
