import { gql } from "@apollo/client";

export const login = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        email
        role
        name
      }
      token
    }
  }
`;
