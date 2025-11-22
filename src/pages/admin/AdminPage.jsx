import React, { useState } from "react";
import "./adminpannel.css";
import { useMutation } from "@apollo/client/react";
import { createRoom } from "../../graphql/mutation/createRoom"; // adjust path
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { bookings as BOOKINGS_QUERY } from "../../graphql/queries/bookings";

const AdminPage = () => {
  const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState({
    number: "",
    type: "",
    pricePerNight: "",
    isActive: true,
    images: "",
    amenities: "",
  });

  const [createRoomMutation, { loading }] = useMutation(createRoom);

  // Fetch bookings
  const {
    data,
    loading: bookingsLoading,
    error: bookingsError,
  } = useQuery(BOOKINGS_QUERY);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setRoomDetails({
      ...roomDetails,
      [name]:
        name === "isActive"
          ? value === "true"
          : name === "pricePerNight" || name === "number"
          ? Number(value)
          : value,
    });
  };

  // Submit to API
  const handleCreateRoom = async () => {
    try {
      await createRoomMutation({
        variables: {
          input: {
            number: roomDetails.number,
            type: roomDetails.type,
            pricePerNight: Number(roomDetails.pricePerNight),
            isActive: roomDetails.isActive,
            images: roomDetails.images.split(",").map((img) => img.trim()),
            amenities: roomDetails.amenities
              .split(",")
              .map((a) => a.trim())
              .filter((a) => a !== ""),
          },
        },
      });

      alert("Room created successfully!");

      // Reset form
      setRoomDetails({
        number: "",
        type: "",
        pricePerNight: "",
        isActive: true,
        images: "",
        amenities: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to create room.");
    }
  };

  return (
    <div className="container" style={{ width: "100%" }}>
      <nav className="admin-nav" style={{ width: "100%" }}>
        <h1>Admin Panel</h1>
      </nav>

      <div>
        <h2>Create Room</h2>

        {/* Form */}
        <form>
          <input
            type="number"
            name="number"
            value={roomDetails.number}
            onChange={handleInputChange}
            placeholder="Room Number"
          />

          <input
            type="text"
            name="type"
            value={roomDetails.type}
            onChange={handleInputChange}
            placeholder="Room Type (e.g., Deluxe, Suite)"
          />

          <input
            type="number"
            name="pricePerNight"
            value={roomDetails.pricePerNight}
            onChange={handleInputChange}
            placeholder="Price Per Night"
          />

          <textarea
            name="images"
            value={roomDetails.images}
            onChange={handleInputChange}
            placeholder="Image URLs (comma separated)"
          />

          <textarea
            name="amenities"
            value={roomDetails.amenities}
            onChange={handleInputChange}
            placeholder="Amenities (comma separated: WiFi, AC, TV)"
          />

          <select
            name="isActive"
            value={roomDetails.isActive}
            onChange={handleInputChange}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <button type="button" onClick={handleCreateRoom} disabled={loading}>
            {loading ? "Creating..." : "Create Room"}
          </button>
        </form>

        {/* <hr />

        <h2>Contact Messages</h2>
        <p>No contact messages available (API not connected yet).</p> */}
      </div>
      {/* <button onClick={() => navigate("/admin/app/create-room")}>
        Create Room
      </button> */}
      {/* Bookings Table */}
      <hr />
      <h2>Booking List</h2>

      {bookingsLoading && <p>Loading bookings...</p>}
      {bookingsError && <p>Error loading bookings: {bookingsError.message}</p>}

      {data && data.bookings.length > 0 ? (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Status</th>
              <th>Total Price</th>
              <th>Room Number</th>
              <th>Amenities</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.user?.name || "N/A"}</td>
                <td>{booking.status}</td>
                <td>{booking.totalPrice}</td>
                <td>{booking.room?.number || "N/A"}</td>
                <td>
                  {booking.room?.amenities
                    ? booking.room.amenities.join(", ")
                    : "N/A"}
                </td>
                <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
                <td>{new Date(booking.checkOut).toLocaleDateString()}</td>
                <td>{new Date(booking.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !bookingsLoading && <p>No bookings found.</p>
      )}
    </div>
  );
};

export default AdminPage;
