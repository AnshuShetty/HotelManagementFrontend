import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "../roomDetails/roomDetail.css";
import { useQuery } from "@apollo/client/react";
import { getRoom } from "../../graphql/queries/room";

const RoomDetails = () => {
  const { id } = useParams(); // Get room ID from URL

  // Fetch room details from GraphQL API
  const { loading, error, data } = useQuery(getRoom, {
    variables: { roomId: id },
  });

  if (loading) return <p>Loading room details...</p>;
  if (error) return <p>Error fetching room details: {error.message}</p>;

  const room = data?.room;

  if (!room) {
    return (
      <div>
        <h1>No Room Found</h1>
        <p>We couldn't find any details for this room.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="room-details-container">
        <h1>Room Details</h1>
        <div className="room-details-card">
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

          <Link
            to="/payment"
            state={{
              id: room.id,
              number: room.number,
              price: room.pricePerNight,
              type: room.type,
            }} // Pass data for payment
            className="btn"
          >
            Proceed to Booking
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RoomDetails;
