import { gql } from "@apollo/client";

export const addReview = gql(`
    mutation AddReview($input: ReviewInput!) {
    addReview(input: $input) {
    rating
    comment
  }
}`);
