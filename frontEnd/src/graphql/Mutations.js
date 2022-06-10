import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      id
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      tokenExpiration
      user {
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
  }
`;
export const ADD_TODO = gql`
  mutation AddTodo(
    $activityDate: String!
    $activityName: String!
    $startTime: String!
    $endTime: String!
    $activityDetails: String
    $createdBy: ID!
  ) {
    addTodo(
      activityDate: $activityDate
      activityName: $activityName
      startTime: $startTime
      endTime: $endTime
      activityDetails: $activityDetails
      createdBy: $createdBy
    ) {
      activityDate
      activityName
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo(
    $activityDate: String
    $activityName: String
    $startTime: String
    $endTime: String
    $activityDetails: String
    $updateTodoId: ID!
  ) {
    addTodo(
      activityDate: $activityDate
      activityName: $activityName
      startTime: $startTime
      endTime: $endTime
      activityDetails: $activityDetails
      id: $updateTodoId
    ) {
      activityDate
      activityName
      startTime
      endTime
      activityDetails
      id
    }
  }
`;
