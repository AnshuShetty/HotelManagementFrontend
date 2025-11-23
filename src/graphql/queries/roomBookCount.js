import { gql } from "@apollo/client";

export const roomBookCount = gql(`
  query {
  rooms {
    id
    number
    type
    bookingCount   
  }
}
 
`);
