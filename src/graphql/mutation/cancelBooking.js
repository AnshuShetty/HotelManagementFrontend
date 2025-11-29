import { gql } from "@apollo/client";

export const cancelBooking = gql(`
    
mutation CancelBooking($cancelBookingId: ID!) {
  cancelBooking(id: $cancelBookingId) {
    status
    message
    BookingID
  }
}`);
