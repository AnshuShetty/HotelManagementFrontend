import React from "react";
import { useQuery } from "@apollo/client/react";
import { getRooms } from "../../graphql/queries/rooms";
import RoomCard from "../../components/roomCard/RoomCard";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "../rooms/rooms.css";
import { useState } from "react";

const Rooms = () => {
  const { loading, error, data } = useQuery(getRooms);
  const [favorites, setFavorites] = useState([]);

  if (loading) return <p>Loading rooms...</p>;
  if (error) return <p>Error fetching rooms: {error.message}</p>;

  const rooms = data?.rooms || [];

  const onToggleFavorite = (roomObj) => {
    setFavorites((prev) => {
      const exists = prev.find((r) => r.id === roomObj.id);

      return exists
        ? prev.filter((r) => r.id !== roomObj.id)
        : [...prev, roomObj];
    });
  };

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
                    isFavorite={favorites.some((r) => r.id === room.id)}
                    onToggleFavorite={() => onToggleFavorite(room)}
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
