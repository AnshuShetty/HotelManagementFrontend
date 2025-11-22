import { gql } from "@apollo/client";

export const CreateBooking = gql(`
    mutation BookRoom($input: BookingInput!) {
  bookRoom(input: $input) {
    room {
      id
    }
    checkIn
    checkOut
    createdAt
    guests
    id
    totalPrice
    user {
      id
      email
    }
  }
}
`);
