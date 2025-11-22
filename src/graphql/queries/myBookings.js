import { gql } from "@apollo/client";

export const myBookings = gql(`
    query MyBookings {
    myBookings {
      id
      room {
        id
        number
        type
        pricePerNight
        isActive
      }
      status
      totalPrice
      user {
        name
      }
    }
  }
`);
