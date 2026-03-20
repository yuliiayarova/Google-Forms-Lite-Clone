import type { Form, FormResponse } from "./form";

export interface GetFormsResponse {
  data: {
    forms: Pick<Form, "id" | "title" | "description">[];
  };
}

export interface GetFormByIdResponse {
  data: {
    form: Form;
  };
}

export interface GetResponsesResponse {
  data: {
    responses: FormResponse[];
  };
}

export interface CreateFormResponse {
  data: {
    createForm: Pick<Form, "id" | "title">;
  };
}

export interface SubmitResponseApiResponse {
  data: {
    submitResponse: Pick<FormResponse, "id" | "formId">;
  };
}
