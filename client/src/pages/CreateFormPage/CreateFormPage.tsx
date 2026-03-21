import { useState } from "react";
import type { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateFormMutation } from "../../store/api";
import QuestionEditor from "../../components/forms/QuestionEditor/QuestionEditor";
import type { QuestionInput, QuestionType } from "../../types/form";

type QuestionInputWithId = QuestionInput & {
  id: string;
};

export default function CreateFormPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<QuestionInputWithId[]>([]);

  const [createForm, { isLoading, error }] = useCreateFormMutation();
  const navigate = useNavigate();

  const generateId = () => crypto.randomUUID();

  const isChoiceType = (type: QuestionType) =>
    type === "MULTIPLE_CHOICE" || type === "CHECKBOX";

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: generateId(),
        label: "",
        type: "TEXT",
        options: [],
      },
    ]);
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
        if (question.id !== id) return question;

        return {
          ...question,
          type: value,
          options: isChoiceType(value)
            ? question.options && question.options.length > 0
              ? question.options
              : [""]
            : [],
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
        if (question.id !== questionId) return question;

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
        if (question.id !== questionId) return question;

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

    if (!title.trim()) return;

    const normalizedQuestions: QuestionInput[] = questions.map((question) => ({
      label: question.label.trim(),
      type: question.type,
      options: isChoiceType(question.type)
        ? (question.options?.filter((option) => option.trim() !== "") ?? [])
        : [],
    }));

    try {
      await createForm({
        title: title.trim(),
        description: description.trim(),
        questions: normalizedQuestions,
      }).unwrap();

      navigate("/");
    } catch (err) {
      console.error("Failed to create form:", err);
    }
  };

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
