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
    id: String
    activityDate: String!
    activityName: String!
    startTime: String!
    endTime: String!
    activityDetails: String
    createdBy: UserType
  }
  type Query {
    getOneUser(id: ID): UserType
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

    #     deleteUser(id: ID):UserType
    #     updateUser(
    #   	  id: ID!
    #   	   firstName: String
    #   	    lastName: String
    #   	    password: String):UserType
  }
`;

module.exports = { typeDefs };
