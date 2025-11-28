import { gql } from "@apollo/client";

export const getReviews = gql(`
    query GetReview($roomId: ID!) {
    getReviews(roomId: $roomId) {
    id
    rating
    comment
    user {
      name
    }
  }
}
`);
