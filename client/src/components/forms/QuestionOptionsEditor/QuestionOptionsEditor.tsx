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
    <div>
      <h3>Options</h3>

      {options.length > 0 ? (
        <ul>
          {options.map((option, index) => (
            <li key={`${questionId}-${index}`}>
              <input
                type="text"
                value={option}
                onChange={(event) =>
                  onOptionChange(questionId, index, event.target.value)
                }
              />
              <button
                type="button"
                onClick={() => onRemoveOption(questionId, index)}
              >
                Remove Option
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No options yet.</p>
      )}

      <button type="button" onClick={() => onAddOption(questionId)}>
        Add Option
      </button>
    </div>
  );
}
