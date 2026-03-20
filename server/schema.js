export const typeDefs = `#graphql

type Form {
  id: ID!
  title: String!
  description: String
  questions: [Question!]!
}

enum QuestionType {
  TEXT
  MULTIPLE_CHOICE
  CHECKBOX
  DATE
}

type Question {
  id: ID!
  label: String!
  type: QuestionType!
  options: [String!]
}

type Response {
  id: ID!
  formId: ID!
  answers: [Answer!]!
}

type Answer {
  questionId: ID!
  value: String!
}

input QuestionInput {
  label: String!
  type: QuestionType!
  options: [String!]
}

input AnswerInput {
  questionId: ID!
  value: String!
}

type Query {
  forms: [Form!]!
  form(id: ID!): Form
  responses(formId: ID!): [Response!]!
}

type Mutation {
  createForm(
    title: String!
    description: String
    questions: [QuestionInput!]
  ): Form

  submitResponse(
    formId: ID!
    answers: [AnswerInput]
  ): Response
}
`;
