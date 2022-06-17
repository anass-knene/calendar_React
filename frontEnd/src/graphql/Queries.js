import { gql } from "@apollo/client";

export const GET_ONE_USER = gql`
  query GetOneUser($getOneUser: ID) {
    getOneUser(id: $getOneUser) {
      firstName
      lastName
      email
      id
      todoList {
        id
        activityDate
        activityName
        activityDetails
        startTime
        endTime
      }
    }
  }
`;
