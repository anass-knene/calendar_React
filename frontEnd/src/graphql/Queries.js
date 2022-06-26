import { gql } from "@apollo/client";

export const GET_ONE_USER = gql`
  query GetOneUser($getOneUserId: ID!) {
    getOneUser(id: $getOneUserId) {
      id
      firstName
      lastName
      email
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
