import { useState } from "react";
import type { SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import {
  useGetFormByIdQuery,
  useSubmitResponseMutation,
} from "../../store/api";
import { normalizeAnswers } from "../../utils/questionHelpers";

export function useFillFormPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useGetFormByIdQuery(id ?? "", {
    skip: !id,
  });

  const [submitResponse, { isLoading: isSubmitting, error: submitError }] =
    useSubmitResponseMutation();

  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [successMessage, setSuccessMessage] = useState("");

  const form = data?.data?.form;

  const handleTextOrDateChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleRadioChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleCheckboxChange = (
    questionId: string,
    option: string,
    checked: boolean,
  ) => {
    setAnswers((prev) => {
      const currentValue = Array.isArray(prev[questionId])
        ? prev[questionId]
        : [];

      if (checked) {
        return {
          ...prev,
          [questionId]: [...currentValue, option],
        };
      }

      return {
        ...prev,
        [questionId]: currentValue.filter((item) => item !== option),
      };
    });
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");

    if (!form) {
      return;
    }

    const normalizedAnswers = normalizeAnswers(form.questions, answers);

    try {
      await submitResponse({
        formId: form.id,
        answers: normalizedAnswers,
      }).unwrap();

      setSuccessMessage("Form submitted successfully!");
      setAnswers({});
    } catch (err) {
      console.error("Failed to submit response:", err);
    }
  };

  return {
    id,
    form,
    answers,
    isLoading,
    error,
    isSubmitting,
    submitError,
    successMessage,
    handleTextOrDateChange,
    handleRadioChange,
    handleCheckboxChange,
    handleSubmit,
  };
}
