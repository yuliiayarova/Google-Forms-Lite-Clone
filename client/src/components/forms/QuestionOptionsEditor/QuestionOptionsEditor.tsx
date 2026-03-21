import css from "./QuestionOptionsEditor.module.css";

interface QuestionOptionsEditorProps {
  questionId: string;
  options: string[];
  onAddOption: (questionId: string) => void;
  onOptionChange: (
    questionId: string,
    optionIndex: number,
    value: string,
  ) => void;
  onRemoveOption: (questionId: string, optionIndex: number) => void;
}

export default function QuestionOptionsEditor({
  questionId,
  options,
  onAddOption,
  onOptionChange,
  onRemoveOption,
}: QuestionOptionsEditorProps) {
  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Options</h3>

      {options.length > 0 ? (
        <ul className={css.list}>
          {options.map((option, index) => (
            <li key={`${questionId}-${index}`} className={css.optionItem}>
              <input
                type="text"
                value={option}
                onChange={(event) =>
                  onOptionChange(questionId, index, event.target.value)
                }
                className={css.input}
              />

              <button
                type="button"
                onClick={() => onRemoveOption(questionId, index)}
                className={css.removeButton}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.empty}>No options yet.</p>
      )}

      <button
        type="button"
        onClick={() => onAddOption(questionId)}
        className={css.addButton}
      >
        Add Option
      </button>
    </div>
  );
}
