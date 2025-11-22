import React from "react";
import { useQuery } from "@apollo/client/react";
import { getRooms } from "../../graphql/queries/rooms";
import RoomCard from "../../components/roomCard/RoomCard";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "../rooms/rooms.css";

const Rooms = () => {
  const { loading, error, data } = useQuery(getRooms);

  if (loading) return <p>Loading rooms...</p>;
  if (error) return <p>Error fetching rooms: {error.message}</p>;

  const rooms = data?.rooms || [];

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="room-page">
          <h1>Our Rooms</h1>

          <div className="rooms-list">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <div key={room.id} className="room-card">
                  <RoomCard
                    id={room.id}
                    image={room.images?.[0] || ""}
                    title={`Room ${room.number}`}
                    description={room.type}
                    price={room.pricePerNight}
                    availability={room.isActive ? "Available" : "Unavailable"}
                  />
                </div>
              ))
            ) : (
              <p>No rooms available at the moment.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Rooms;
