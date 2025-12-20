import { useQuery } from "@apollo/client/react";
import { getRooms } from "../../graphql/queries/rooms";
import RoomCard from "../../components/roomCard/RoomCard";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "../rooms/rooms.css";
import { useState, useEffect } from "react";

const Rooms = () => {
  const { loading, error, data } = useQuery(getRooms);
  const [favorites, setFavorites] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const rooms = data?.rooms || [];

  //  Load favorites FIRST
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("favoriteRooms"));
      if (Array.isArray(stored)) {
        setFavorites(stored);
      }
    } catch {}
    setHasLoaded(true);
  }, []);

  //  Write ONLY after load
  useEffect(() => {
    if (!hasLoaded) return;
    localStorage.setItem("favoriteRooms", JSON.stringify(favorites));
  }, [favorites, hasLoaded]);

  if (loading) return <p>Loading rooms...</p>;
  if (error) return <p>Error fetching rooms: {error.message}</p>;

  const onToggleFavorite = (roomId) => {
    const room = rooms.find((r) => r.id === roomId);
    if (!room) return;

    setFavorites((prev) => {
      const exists = prev.some((r) => r.id === roomId);
      return exists ? prev.filter((r) => r.id !== roomId) : [...prev, room];
    });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="room-page">
          <h1>Our Rooms</h1>

          <div className="rooms-list">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                id={room.id}
                image={room.images?.[0]}
                title={`Room ${room.number}`}
                description={room.type}
                price={room.pricePerNight}
                availability={room.isActive}
                isFavorite={favorites.some((r) => r.id === room.id)}
                onToggleFavorite={() => onToggleFavorite(room.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Rooms;
