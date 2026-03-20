import { forms, responses } from "./data.js";

export const resolvers = {
  Query: {
    forms: () => forms,

    form: (_, { id }) => forms.find((f) => f.id === id),

    responses: (_, { formId }) => responses.filter((r) => r.formId === formId),
  },

  Mutation: {
    createForm: (_, { title, description, questions }) => {
      const newForm = {
        id: String(Date.now()),
        title,
        description,
        questions: (questions || []).map((q, index) => ({
          id: String(index + 1),
          ...q,
        })),
      };

      forms.push(newForm);
      return newForm;
    },

    submitResponse: (_, { formId, answers }) => {
      const newResponse = {
        id: String(Date.now()),
        formId,
        answers,
      };

      responses.push(newResponse);
      return newResponse;
    },
  },
};
