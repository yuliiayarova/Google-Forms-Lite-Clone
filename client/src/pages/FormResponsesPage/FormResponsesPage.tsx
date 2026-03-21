import ResponseCard from "../../components/forms/ResponseCard/ResponseCard";
import { useFormResponsesPage } from "./useFormResponsesPage";
import css from "./FormResponsesPage.module.css";
import Loader from "../../components/Loader/Loader";

export default function FormResponsesPage() {
  const {
    id,
    form,
    responses,
    isFormLoading,
    isResponsesLoading,
    formError,
    responsesError,
    getQuestionLabel,
  } = useFormResponsesPage();

  if (!id) return <p className={css.stateMessage}>Form id is missing.</p>;
  if (isFormLoading || isResponsesLoading) {
    return (
      <div className={css.page}>
        <Loader />
      </div>
    );
  }
  if (formError)
    return <p className={css.stateMessage}>Failed to load form.</p>;
  if (responsesError) {
    return <p className={css.stateMessage}>Failed to load responses.</p>;
  }
  if (!form) return <p className={css.stateMessage}>Form not found.</p>;

  return (
    <div className={css.page}>
      <div className={css.card}>
        <div className={css.cardTop} />

        <div className={css.content}>
          <h1 className={css.title}>Responses for: {form.title}</h1>
          <p className={css.description}>{form.description}</p>

          {responses.length === 0 ? (
            <p className={css.emptyState}>No responses yet.</p>
          ) : (
            <div className={css.responsesList}>
              {responses.map((response, index) => (
                <ResponseCard
                  key={response.id}
                  response={response}
                  index={index}
                  getQuestionLabel={getQuestionLabel}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
