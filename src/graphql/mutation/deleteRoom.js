import { gql } from "@apollo/client";

export const deleteRoom = gql(`
    mutation DeleteRoom($deleteRoomId: ID!) {
  deleteRoom(id: $deleteRoomId) {
    roomId
    status
    message
  }
}`);
