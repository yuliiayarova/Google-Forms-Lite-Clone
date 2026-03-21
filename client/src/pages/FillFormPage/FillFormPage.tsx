import { useState, type SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import {
  useGetFormByIdQuery,
  useSubmitResponseMutation,
} from "../../store/api";
import QuestionRenderer from "../../components/forms/QuestionRenderer/QuestionRenderer";

export default function FillFormPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useGetFormByIdQuery(id ?? "", {
    skip: !id,
  });

  const [submitResponse, { isLoading: isSubmitting, error: submitError }] =
    useSubmitResponseMutation();

  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [successMessage, setSuccessMessage] = useState("");

  if (!id) return <p>Form id is missing.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load form.</p>;

  const form = data?.data?.form;

  if (!form) return <p>Form not found.</p>;

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

    const normalizedAnswers = form.questions.map((question) => {
      const rawValue = answers[question.id];

      return {
        questionId: question.id,
        value: Array.isArray(rawValue) ? rawValue.join(", ") : (rawValue ?? ""),
      };
    });

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

  return (
    <div>
      <h1>{form.title}</h1>
      <p>{form.description}</p>

      <form onSubmit={handleSubmit}>
        <ul>
          {form.questions.map((question) => (
            <li key={question.id}>
              <QuestionRenderer
                question={question}
                value={answers[question.id]}
                onTextOrDateChange={handleTextOrDateChange}
                onRadioChange={handleRadioChange}
                onCheckboxChange={handleCheckboxChange}
              />
            </li>
          ))}
        </ul>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        {successMessage && <p>{successMessage}</p>}
        {submitError && <p>Failed to submit form.</p>}
      </form>
    </div>
  );
}
