import QuestionRenderer from "../../components/forms/QuestionRenderer/QuestionRenderer";
import { useFillFormPage } from "./useFillFormPage";
import css from "./FillFormPage.module.css";
import Loader from "../../components/Loader/Loader";

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

  if (!id) return <p className={css.stateMessage}>Form id is missing.</p>;
  if (isLoading) {
    return (
      <div className={css.page}>
        <Loader />
      </div>
    );
  }
  if (error) return <p className={css.stateMessage}>Failed to load form.</p>;
  if (!form) return <p className={css.stateMessage}>Form not found.</p>;

  return (
    <div className={css.page}>
      <div className={css.card}>
        <div className={css.cardTop} />

        <div className={css.content}>
          <h1 className={css.title}>{form.title}</h1>
          <p className={css.description}>{form.description}</p>

          <form onSubmit={handleSubmit} className={css.form}>
            <ul className={css.questionsList}>
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

            <div className={css.actions}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={css.submitButton}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>

            {successMessage && <p className={css.success}>{successMessage}</p>}
            {submitError && <p className={css.error}>Failed to submit form.</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
