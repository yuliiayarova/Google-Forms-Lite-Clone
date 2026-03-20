import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AnswerInput, QuestionInput } from "../types/form";

interface GetFormsResponse {
  data: {
    forms: {
      id: string;
      title: string;
      description?: string;
    }[];
  };
}

interface GetFormByIdResponse {
  data: {
    form: {
      id: string;
      title: string;
      description?: string;
      questions: {
        id: string;
        label: string;
        type: string;
        options?: string[];
      }[];
    };
  };
}

interface GetResponsesResponse {
  data: {
    responses: {
      id: string;
      formId: string;
      answers: {
        questionId: string;
        value: string;
      }[];
    }[];
  };
}

interface CreateFormArgs {
  title: string;
  description?: string;
  questions: QuestionInput[];
}

interface SubmitResponseArgs {
  formId: string;
  answers: AnswerInput[];
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
  }),
  tagTypes: ["Forms", "Responses", "Form"],
  endpoints: (builder) => ({
    getForms: builder.query<GetFormsResponse, void>({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: `
            query {
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
      providesTags: ["Form"],
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
      providesTags: ["Responses"],
    }),

    createForm: builder.mutation<any, CreateFormArgs>({
      query: ({ title, description, questions }) => ({
        url: "",
        method: "POST",
        body: {
          query: `
            mutation CreateForm(
              $title: String!
              $description: String
              $questions: [QuestionInput]
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

    submitResponse: builder.mutation<any, SubmitResponseArgs>({
      query: ({ formId, answers }) => ({
        url: "",
        method: "POST",
        body: {
          query: `
            mutation SubmitResponse(
              $formId: ID!
              $answers: [AnswerInput]
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
      invalidatesTags: ["Responses"],
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
