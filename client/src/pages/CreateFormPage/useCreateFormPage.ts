import { useState } from "react";
import type { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ValidationError } from "yup";
import { useCreateFormMutation } from "../../store/api";
import type { QuestionType } from "../../types/form";
import {
  createEmptyQuestion,
  getOptionsByQuestionType,
  normalizeQuestions,
  type QuestionInputWithId,
} from "../../utils/questionHelpers";
import { createFormSchema } from "../../utils/formValidation";

export function useCreateFormPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<QuestionInputWithId[]>([]);
  const [validationError, setValidationError] = useState("");

  const [createForm, { isLoading, error }] = useCreateFormMutation();
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions((prev) => [...prev, createEmptyQuestion()]);
  };

  const handleQuestionLabelChange = (id: string, value: string) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === id ? { ...question, label: value } : question,
      ),
    );
  };

  const handleQuestionTypeChange = (id: string, value: QuestionType) => {
    setQuestions((prev) =>
      prev.map((question) => {
        if (question.id !== id) {
          return question;
        }

        return {
          ...question,
          type: value,
          options: getOptionsByQuestionType(value, question.options),
        };
      }),
    );
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((question) => question.id !== id));
  };

  const handleAddOption = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: [...(question.options ?? []), ""],
            }
          : question,
      ),
    );
  };

  const handleOptionChange = (
    questionId: string,
    optionIndex: number,
    value: string,
  ) => {
    setQuestions((prev) =>
      prev.map((question) => {
        if (question.id !== questionId) {
          return question;
        }

        const updatedOptions = [...(question.options ?? [])];
        updatedOptions[optionIndex] = value;

        return {
          ...question,
          options: updatedOptions,
        };
      }),
    );
  };

  const handleRemoveOption = (questionId: string, optionIndex: number) => {
    setQuestions((prev) =>
      prev.map((question) => {
        if (question.id !== questionId) {
          return question;
        }

        return {
          ...question,
          options: (question.options ?? []).filter(
            (_, index) => index !== optionIndex,
          ),
        };
      }),
    );
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError("");

    if (!title.trim()) {
      setValidationError("Form title is required");
      return;
    }

    try {
      await createFormSchema.validate(
        {
          title,
          description,
          questions,
        },
        { abortEarly: true },
      );

      const normalizedQuestions = normalizeQuestions(questions);

      await createForm({
        title: title.trim(),
        description: description.trim(),
        questions: normalizedQuestions,
      }).unwrap();

      navigate("/");
    } catch (err) {
      if (err instanceof ValidationError) {
        setValidationError(err.message);
        return;
      }

      console.error("Failed to create form:", err);
    }
  };

  return {
    title,
    description,
    questions,
    isLoading,
    error,
    validationError,
    setTitle,
    setDescription,
    handleAddQuestion,
    handleQuestionLabelChange,
    handleQuestionTypeChange,
    handleRemoveQuestion,
    handleAddOption,
    handleOptionChange,
    handleRemoveOption,
    handleSubmit,
  };
}
