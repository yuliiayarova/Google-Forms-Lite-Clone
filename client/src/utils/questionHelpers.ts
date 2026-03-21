import type { QuestionInput, QuestionType } from "../types/form";

export type QuestionInputWithId = QuestionInput & {
  id: string;
};

export const generateQuestionId = (): string => crypto.randomUUID();

export const isChoiceType = (type: QuestionType): boolean => {
  return type === "MULTIPLE_CHOICE" || type === "CHECKBOX";
};

export const createEmptyQuestion = (): QuestionInputWithId => {
  return {
    id: generateQuestionId(),
    label: "",
    type: "TEXT",
    options: [],
  };
};

export const getOptionsByQuestionType = (
  type: QuestionType,
  currentOptions?: string[],
): string[] => {
  if (!isChoiceType(type)) {
    return [];
  }

  if (currentOptions && currentOptions.length > 0) {
    return currentOptions;
  }

  return [""];
};

export const normalizeQuestions = (
  questions: QuestionInputWithId[],
): QuestionInput[] => {
  return questions.map((question) => ({
    label: question.label.trim(),
    type: question.type,
    options: isChoiceType(question.type)
      ? (question.options?.filter((option) => option.trim() !== "") ?? [])
      : [],
  }));
};

export const normalizeAnswers = (
  questions: { id: string }[],
  answers: Record<string, string | string[]>,
) => {
  return questions.map((question) => {
    const rawValue = answers[question.id];

    return {
      questionId: question.id,
      value: Array.isArray(rawValue) ? rawValue.join(", ") : (rawValue ?? ""),
    };
  });
};
