import QuestionEditor from "../../components/forms/QuestionEditor/QuestionEditor";
import { useCreateFormPage } from "./useCreateFormPage";

export default function CreateFormPage() {
  const {
    title,
    description,
    questions,
    isLoading,
    error,
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
    <div>
      <h1>Create New Form</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div>
          <h2>Questions</h2>
          <button type="button" onClick={handleAddQuestion}>
            Add Question
          </button>

          {questions.length === 0 ? (
            <p>No questions added yet.</p>
          ) : (
            <ul>
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

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Form"}
        </button>

        {error && <p>Failed to create form.</p>}
      </form>
    </div>
  );
}
