const { gql } = require("apollo-server");

const typeDefs = gql`
  type UserType {
    id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    todoList: [TodoType]
  }
  type UserAuthType {
    token: String!
    tokenExpiration: Int!
    user: UserType
  }
  type VerifyType {
    user: UserType
  }
  type TodoType {
    id: ID
    activityDate: String!
    activityName: String!
    startTime: String!
    endTime: String!
    activityDetails: String
    createdBy: UserType
  }
  type BooleanType {
    success: Boolean
  }
  type Query {
    getOneUser(id: ID!): UserType
    getVerify: VerifyType
  }
  type Mutation {
    loginUser(email: String!, password: String!): UserAuthType!

    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): UserType

    addTodo(
      activityDate: String!
      activityName: String!
      startTime: String!
      endTime: String!
      activityDetails: String
      createdBy: ID!
    ): TodoType

    updateTodo(
      id: ID!
      activityDate: String
      activityName: String
      startTime: String
      endTime: String
      activityDetails: String
    ): TodoType

    deleteTodo(todoId: ID!, userId: ID!): BooleanType
    #     updateUser(
    #   	  id: ID!
    #   	   firstName: String
    #   	    lastName: String
    #   	    password: String):UserType
  }
`;

module.exports = { typeDefs };
