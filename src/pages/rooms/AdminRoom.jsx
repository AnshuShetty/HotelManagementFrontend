import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { roomBookCount } from "../../graphql/queries/roomBookCount";
import { UPDATE_ROOM } from "../../graphql/mutation/updateRoom";
import Navbar from "../../components/navbar/Navbar";

const AdminRoom = () => {
  const { data, loading, error, refetch } = useQuery(roomBookCount);
  const [updateRoom] = useMutation(UPDATE_ROOM);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    type: "",
    pricePerNight: "",
    number: "",
    // keep as string to match select option values ("true" / "false")
    isActive: "true",
    images: "",
    amenities: "",
  });

  if (loading) return <p>Loading rooms...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // ----------------------
  // Open modal + fill data
  // ----------------------
  const handleUpdateRoom = (room) => {
    setSelectedRoom(room);

    setFormData({
      type: room.type,
      pricePerNight: room.pricePerNight,
      number: room.number,
      // normalize boolean to string for the select control
      isActive: room.isActive ? "true" : "false",
      images: room.images?.join(", ") || "",
      amenities: room.amenities?.join(", ") || "",
    });

    setIsModalOpen(true);
  };

  // ----------------------
  // Submit update mutation
  // ----------------------
  const handleSubmitUpdate = async () => {
    try {
      // sanitize & convert values
      const input = {
        type: String(formData.type),
        pricePerNight: Number(formData.pricePerNight) || 0,
        number: Number(formData.number) || 0,

        isActive: String(formData.isActive) === "true",
        images: (formData.images || "")
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
        amenities: (formData.amenities || "")
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
      };

      await updateRoom({
        variables: {
          input,
          updateRoomId: selectedRoom.id,
        },
      });

      alert("Room updated successfully!");

      setIsModalOpen(false);
      refetch();
    } catch (err) {
      alert("Error updating room: " + err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Admin Room Management Page</h1>

      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th style={styles.th}>Room Number</th>
            <th style={styles.th}>Amenities</th>
            <th style={styles.th}>Room Type</th>
            <th style={styles.th}>Bookings</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.rooms.map((room) => (
            <tr key={room.id}>
              <td style={styles.td}>{room.number}</td>
              <td style={styles.td}>{room.amenities?.join(", ") || "None"}</td>
              <td style={styles.td}>{room.number}</td>
              <td style={styles.td}>{room.type}</td>
              <td style={styles.td}>{room.bookingCount}</td>
              <td style={styles.td}>
                <button
                  style={styles.updateBtn}
                  onClick={() => handleUpdateRoom(room)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ------------------- Modal ------------------- */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>Update Room</h2>

            <label>Room Type</label>
            <input
              style={styles.input}
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            />

            <label>Price Per Night</label>
            <input
              style={styles.input}
              type="number"
              value={formData.pricePerNight}
              onChange={(e) =>
                setFormData({ ...formData, pricePerNight: e.target.value })
              }
            />

            <label>Room Number</label>
            <input
              style={styles.input}
              type="number"
              value={formData.number}
              onChange={(e) =>
                setFormData({ ...formData, number: e.target.value })
              }
            />

            <label>Is Active?</label>
            <select
              style={styles.input}
              value={formData.isActive}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  // keep string here, convert on submit
                  isActive: e.target.value,
                })
              }
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <label>Images (comma separated URLs)</label>
            <input
              style={styles.input}
              value={formData.images}
              onChange={(e) =>
                setFormData({ ...formData, images: e.target.value })
              }
            />

            <label>Amenities (comma separated)</label>
            <input
              style={styles.input}
              value={formData.amenities}
              onChange={(e) =>
                setFormData({ ...formData, amenities: e.target.value })
              }
            />

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "row-reverse",
                gap: "10px",
              }}
            >
              <button style={styles.saveBtn} onClick={handleSubmitUpdate}>
                Save Changes
              </button>
              <button
                style={styles.cancelBtn}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ------------------- End Modal ------------------- */}
    </div>
  );
};

// ------------------- Styles -------------------
const styles = {
  th: { border: "1px solid #ccc", padding: "10px", background: "#eee" },
  td: { border: "1px solid #ccc", padding: "10px" },

  updateBtn: {
    padding: "6px 10px",
    background: "#0275d8",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    background: "#fff",
    padding: "20px",
    width: "600px",
    borderRadius: "8px",
  },

  input: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },

  saveBtn: {
    padding: "8px 14px",
    background: "green",
    color: "#fff",
    border: "none",
    marginRight: "10px",
    cursor: "pointer",
  },

  cancelBtn: {
    padding: "8px 14px",
    background: "red",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default AdminRoom;
