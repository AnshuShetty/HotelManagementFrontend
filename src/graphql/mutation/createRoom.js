import { gql } from "@apollo/client";

export const createRoom = gql(`
    mutation CreateRoom($input: RoomInput!) {
    createRoom(input: $input) {
    isActive
    number
    pricePerNight
    type
    images
    id
  }
}
`);
