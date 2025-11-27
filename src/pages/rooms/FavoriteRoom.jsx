import React, { useEffect, useState } from "react";

const FavoriteRoom = ({ favoriteRooms }) => {
  // keep local state so component updates safely and can fallback to localStorage
  const [favorites, setFavorites] = useState(
    Array.isArray(favoriteRooms) ? favoriteRooms : []
  );

  useEffect(() => {
    if (Array.isArray(favoriteRooms)) {
      setFavorites(favoriteRooms);
      return;
    }
    // fallback: try to read favorites from localStorage (if your app stores them there)
    try {
      const stored = JSON.parse(localStorage.getItem("favoriteRooms"));
      if (Array.isArray(stored)) setFavorites(stored);
    } catch (e) {
      // ignore parse errors and keep empty list
    }
  }, [favoriteRooms]);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Your Favourite Rooms</h1>

      {favorites.length === 0 ? (
        <p style={styles.empty}>No favourite rooms added yet.</p>
      ) : (
        <div style={styles.list}>
          {favorites.map((room, idx) => (
            <RoomCard key={room.id || room._id || idx} room={room} />
          ))}
        </div>
      )}
    </div>
  );
};

// Room Card Component
const RoomCard = ({ room }) => {
  return (
    <div style={styles.card}>
      <img
        src={
          room.image ||
          room.img ||
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
        }
        alt={room.name || room.title || "Room"}
        style={styles.image}
      />

      <div style={styles.details}>
        <h2 style={styles.roomName}>
          {room.name || room.title || "Untitled Room"}
        </h2>
        <p style={styles.description}>
          {room.description || room.type || "No description."}
        </p>
      </div>
    </div>
  );
};

// Inline CSS styles (you may replace with CSS file)
const styles = {
  page: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: "20px",
  },
  empty: {
    fontStyle: "italic",
    color: "#777",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
  },
  details: {
    padding: "12px",
  },
  roomName: {
    margin: "0 0 6px 0",
  },
  description: {
    margin: 0,
    color: "#555",
  },
};

export default FavoriteRoom;
