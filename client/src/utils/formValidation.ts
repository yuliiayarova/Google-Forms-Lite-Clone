import * as yup from "yup";
import type { QuestionType } from "../types/form";
import type { QuestionInputWithId } from "./questionHelpers";

interface CreateFormValidationData {
  title: string;
  description: string;
  questions: QuestionInputWithId[];
}

const choiceTypes: QuestionType[] = ["MULTIPLE_CHOICE", "CHECKBOX"];

const questionSchema: yup.ObjectSchema<QuestionInputWithId> = yup.object({
  id: yup.string().required(),
  label: yup.string().trim().required("Question label is required"),
  type: yup
    .mixed<QuestionType>()
    .oneOf(["TEXT", "MULTIPLE_CHOICE", "CHECKBOX", "DATE"])
    .required(),
  options: yup
    .array()
    .of(yup.string().trim().required())
    .defined()
    .test(
      "options-required-for-choice-types",
      "Choice questions must have at least one option",
      function (options) {
        const { type } = this.parent as QuestionInputWithId;

        if (!choiceTypes.includes(type)) {
          return true;
        }

        const validOptions =
          options?.filter((option) => option.trim() !== "") ?? [];

        return validOptions.length > 0;
      },
    ),
});

export const createFormSchema: yup.ObjectSchema<CreateFormValidationData> =
  yup.object({
    title: yup.string().trim().required("Form title is required"),
    description: yup.string().default(""),
    questions: yup
      .array()
      .of(questionSchema)
      .min(1, "Add at least one question")
      .required(),
  });
