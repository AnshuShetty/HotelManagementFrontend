import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import RoomCard from "../../components/roomCard/RoomCard";

const HeartFilled = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const FavoriteRoom = () => {
  const [favorites, setFavorites] = useState([]);

  // ALWAYS re-read favorites when page is visited
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("favoriteRooms"));
        if (Array.isArray(stored)) setFavorites(stored);
      } catch {}
    };

    loadFavorites();
    window.addEventListener("focus", loadFavorites);

    return () => window.removeEventListener("focus", loadFavorites);
  }, []);

  const onToggleFavorite = (roomId) => {
    const updated = favorites.filter((r) => r.id !== roomId);
    setFavorites(updated);
    localStorage.setItem("favoriteRooms", JSON.stringify(updated));
  };

  return (
    <>
      <Navbar />
      <h1 style={{ margin: "20px" }}>Your Favourite Rooms</h1>

      {favorites.length === 0 ? (
        <p style={{ margin: "20px" }}>No favourite rooms yet.</p>
      ) : (
        <div style={{ display: "flex", gap: "12px" }}>
          {favorites.map((room) => (
            <RoomCard
              key={room.id}
              id={room.id}
              image={room.images?.[0]}
              title={`Room ${room.number}`}
              description={room.type}
              price={room.pricePerNight}
              availability={room.isActive}
              isFavorite={true}
              onToggleFavorite={() => onToggleFavorite(room.id)}
            />
          ))}
        </div>
      )}

      <Footer />
    </>
  );
};

export default FavoriteRoom;
