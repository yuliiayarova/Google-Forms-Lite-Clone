import QuestionEditor from "../../components/forms/QuestionEditor/QuestionEditor";
import { useCreateFormPage } from "./useCreateFormPage";
import css from "./CreateFormPage.module.css";

export default function CreateFormPage() {
  const {
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
  } = useCreateFormPage();

  return (
    <div className={css.page}>
      <div className={css.card}>
        <div className={css.cardTop} />

        <div className={css.content}>
          <h1 className={css.title}>Create New Form</h1>

          <form onSubmit={handleSubmit} className={css.form}>
            <div className={css.fieldGroup}>
              <label htmlFor="title" className={css.label}>
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className={css.input}
              />
            </div>

            <div className={css.fieldGroup}>
              <label htmlFor="description" className={css.label}>
                Description
              </label>
              <textarea
                id="description"
                rows={1}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className={css.textarea}
              />
            </div>

            <div className={css.section}>
              <div className={css.sectionHeader}>
                <h2 className={css.sectionTitle}>Questions</h2>
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className={css.secondaryButton}
                >
                  Add Question
                </button>
              </div>

              {questions.length === 0 ? (
                <p className={css.emptyState}>No questions added yet.</p>
              ) : (
                <ul className={css.questionsList}>
                  {questions.map((question) => (
                    <QuestionEditor
                      key={question.id}
                      id={question.id}
                      label={question.label}
                      type={question.type}
                      options={question.options}
                      onLabelChange={handleQuestionLabelChange}
                      onTypeChange={handleQuestionTypeChange}
                      onRemove={handleRemoveQuestion}
                      onAddOption={handleAddOption}
                      onOptionChange={handleOptionChange}
                      onRemoveOption={handleRemoveOption}
                    />
                  ))}
                </ul>
              )}
            </div>

            <div className={css.actions}>
              <button
                type="submit"
                disabled={isLoading}
                className={css.primaryButton}
              >
                {isLoading ? "Saving..." : "Save Form"}
              </button>
            </div>

            {validationError && <p className={css.error}>{validationError}</p>}
            {error && <p className={css.error}>Failed to create form.</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
