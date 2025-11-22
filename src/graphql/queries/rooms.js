import { gql } from "@apollo/client";

export const getRooms = gql`
  query Rooms {
    rooms {
      id
      number
      pricePerNight
      type
      isActive
      images
      amenities
    }
  }
`;
