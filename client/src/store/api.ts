import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AnswerInput, QuestionInput } from "../types/form";
import type {
  CreateFormResponse,
  GetFormByIdResponse,
  GetFormsResponse,
  GetResponsesResponse,
  SubmitResponseApiResponse,
} from "../types/api";

export interface CreateFormArgs {
  title: string;
  description?: string;
  questions: QuestionInput[];
}

export interface SubmitResponseArgs {
  formId: string;
  answers: AnswerInput[];
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
  }),
  tagTypes: ["Forms", "Form", "Responses"],
  endpoints: (builder) => ({
    getForms: builder.query<GetFormsResponse, void>({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: `
            query GetForms {
              forms {
                id
                title
                description
              }
            }
          `,
        },
      }),
      providesTags: ["Forms"],
    }),

    getFormById: builder.query<GetFormByIdResponse, string>({
      query: (id) => ({
        url: "",
        method: "POST",
        body: {
          query: `
            query GetForm($id: ID!) {
              form(id: $id) {
                id
                title
                description
                questions {
                  id
                  label
                  type
                  options
                }
              }
            }
          `,
          variables: { id },
        },
      }),
      providesTags: (_result, _error, id) => [{ type: "Form", id }],
    }),

    getResponses: builder.query<GetResponsesResponse, string>({
      query: (formId) => ({
        url: "",
        method: "POST",
        body: {
          query: `
            query GetResponses($formId: ID!) {
              responses(formId: $formId) {
                id
                formId
                answers {
                  questionId
                  value
                }
              }
            }
          `,
          variables: { formId },
        },
      }),
      providesTags: (_result, _error, formId) => [
        { type: "Responses", id: formId },
      ],
    }),

    createForm: builder.mutation<CreateFormResponse, CreateFormArgs>({
      query: ({ title, description, questions }) => ({
        url: "",
        method: "POST",
        body: {
          query: `
            mutation CreateForm(
              $title: String!
              $description: String
              $questions: [QuestionInput!]
            ) {
              createForm(
                title: $title
                description: $description
                questions: $questions
              ) {
                id
                title
              }
            }
          `,
          variables: {
            title,
            description,
            questions,
          },
        },
      }),
      invalidatesTags: ["Forms"],
    }),

    submitResponse: builder.mutation<
      SubmitResponseApiResponse,
      SubmitResponseArgs
    >({
      query: ({ formId, answers }) => ({
        url: "",
        method: "POST",
        body: {
          query: `
            mutation SubmitResponse(
              $formId: ID!
              $answers: [AnswerInput!]
            ) {
              submitResponse(
                formId: $formId
                answers: $answers
              ) {
                id
                formId
              }
            }
          `,
          variables: {
            formId,
            answers,
          },
        },
      }),
      invalidatesTags: (_result, _error, { formId }) => [
        { type: "Responses", id: formId },
      ],
    }),
  }),
});

export const {
  useGetFormsQuery,
  useGetFormByIdQuery,
  useGetResponsesQuery,
  useCreateFormMutation,
  useSubmitResponseMutation,
} = api;
