import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

import { useQuery, useMutation } from "@apollo/client/react";
import { ME_QUERY } from "../../graphql/queries/getUser";
import { CreateBooking } from "../../graphql/mutation/createBooking";

const Payment = () => {
  const location = useLocation();

  // Fix: roomId is actually "id" from state
  const { id: roomId, type, price } = location.state || {};

  /** ---------- Get logged-in user automatically ---------- */
  const { data: userData } = useQuery(ME_QUERY);
  // const userId = userData?.me?.id;
  /** ---------- Local state ---------- */
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);
  const [receipt, setReceipt] = useState(null);

  const [bookRoomMutation] = useMutation(CreateBooking);

  /** ---------- calculate total price ---------- */
  useEffect(() => {
    if (checkIn && checkOut) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);

      const diff = outDate - inDate;
      const calculatedNights = Math.ceil(diff / (1000 * 60 * 60 * 24));

      if (calculatedNights > 0) {
        setNights(calculatedNights);
        setTotalPrice(calculatedNights * price);
      }
    }
  }, [checkIn, checkOut, price]);

  /** ---------- Submit booking ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await bookRoomMutation({
        variables: {
          input: {
            roomId, // <-- correct
            checkIn,
            checkOut,
            guests,
            // userId NOT REQUIRED because backend extracts from token
          },
        },
      });

      alert("Booking Successful!");

      setReceipt({
        type,
        checkIn,
        checkOut,
        nights,
        totalPrice,
        date: new Date().toLocaleDateString(),
      });

      console.log("BOOKING RESPONSE:", data);
    } catch (error) {
      console.error("Error booking:", error);
      const backendMessage =
        error?.graphQLErrors?.[0]?.message || "Booking failed!";

      alert(backendMessage);
    }
  };

  if (!roomId) return <h2>No room selected!</h2>;

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
        <h2>Booking Details</h2>

        {receipt ? (
          <div>
            <h3>Payment Receipt</h3>
            <p>
              <strong>Room Type:</strong> {receipt.type}
            </p>
            <p>
              <strong>Check-In:</strong> {receipt.checkIn}
            </p>
            <p>
              <strong>Check-Out:</strong> {receipt.checkOut}
            </p>
            <p>
              <strong>Nights:</strong> {receipt.nights}
            </p>
            <p>
              <strong>Total Price:</strong> ₹{receipt.totalPrice}
            </p>
            <p>
              <strong>Date:</strong> {receipt.date}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3>Room Details</h3>
            <p>
              <strong>Room Type:</strong> {type}
            </p>
            <p>
              <strong>Price/Night:</strong> ₹{price}
            </p>

            <label>Check-In Date</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />

            <label>Check-Out Date</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />

            <label>Number of Guests</label>
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              required
            />

            <h4>Nights: {nights}</h4>
            <h4>Total Price: ₹{totalPrice}</h4>

            <button type="submit">Book Now</button>
          </form>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Payment;
