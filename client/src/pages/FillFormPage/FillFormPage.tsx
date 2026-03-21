import QuestionRenderer from "../../components/forms/QuestionRenderer/QuestionRenderer";
import { useFillFormPage } from "./useFillFormPage";

export default function FillFormPage() {
  const {
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
  } = useFillFormPage();

  if (!id) return <p>Form id is missing.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load form.</p>;
  if (!form) return <p>Form not found.</p>;

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
