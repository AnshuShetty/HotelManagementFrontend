import { gql } from "@apollo/client";

export const bookings = gql(`
    query Bookings {
  bookings {
    user {
      name
    }
    status
    totalPrice
    room {
      number
      amenities
    }
    createdAt
    checkIn
    checkOut
  }
}
 `);
