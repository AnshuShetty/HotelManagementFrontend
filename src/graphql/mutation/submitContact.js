import { gql } from "@apollo/client";

export const submitContact = gql(
  `
    mutation SubmitContact($input: ContactInput!) {
    submitContact(input: $input) {
    name
    email
    message
    id
    createdAt
  }
}`
);
