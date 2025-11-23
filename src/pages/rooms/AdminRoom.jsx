import React from "react";
import { useQuery } from "@apollo/client/react";
import { roomBookCount } from "../../graphql/queries/roomBookCount";
import Navbar from "../../components/navbar/Navbar";

const AdminRoom = () => {
  const { data, loading, error } = useQuery(roomBookCount);

  if (loading) return <p>Loading rooms...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Navbar />
      <h1>Admin Room Management Page</h1>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead style={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
          <tr>
            <th style={styles.th}>Room Number</th>
            <th style={styles.th}>Room Type</th>
            <th style={styles.th}>Number of Bookings</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.rooms.map((room) => (
            <tr key={room.id}>
              <td style={styles.td}>{room.number}</td>
              <td style={styles.td}>{room.type}</td>
              <td style={styles.td}>{room.bookingCount}</td>
              <td style={styles.td}>
                <button
                  style={styles.updateBtn}
                  onClick={() => handleUpdateRoom(room.id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Dummy handler for update button
const handleUpdateRoom = (roomId) => {
  alert(`Redirect to update page for room ID: ${roomId}`);
};

const styles = {
  th: {
    width: "25%",
    flex: 1,
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
    backgroundColor: "#f2f2f2",
  },
  td: { border: "1px solid #ddd", padding: "8px" },
  updateBtn: {
    padding: "6px 12px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AdminRoom;
