import { gql } from "@apollo/client";

export const getRoom = gql`
  query Room($roomId: ID!) {
    room(id: $roomId) {
      id
      amenities
      images
      isActive
      pricePerNight
      number
      type
    }
  }
`;
