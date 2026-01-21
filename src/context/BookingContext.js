import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    roomId: null,
    roomName: null,
    checkInDate: null,
    checkOutDate: null,
    numberOfGuests: 1,
    totalPrice: 0,
    bookingDetails: null,
  });

  const setBooking = (data) => {
    setBookingData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const updateBookingDetails = (details) => {
    setBookingData((prev) => ({
      ...prev,
      bookingDetails: details,
    }));
  };

  const clearBooking = () => {
    setBookingData({
      roomId: null,
      roomName: null,
      checkInDate: null,
      checkOutDate: null,
      numberOfGuests: 1,
      totalPrice: 0,
      bookingDetails: null,
    });
  };

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        setBooking,
        updateBookingDetails,
        clearBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
};
