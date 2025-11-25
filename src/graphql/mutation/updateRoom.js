import { gql } from "@apollo/client";

export const UPDATE_ROOM = gql`
  mutation UpdateRoom($input: RoomInput!, $updateRoomId: ID!) {
    updateRoom(input: $input, id: $updateRoomId) {
      id
      type
      pricePerNight
      number
      isActive
      images
      amenities
    }
  }
`;
