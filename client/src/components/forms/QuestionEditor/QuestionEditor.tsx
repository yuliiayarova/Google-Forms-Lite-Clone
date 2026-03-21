import QuestionOptionsEditor from "../QuestionOptionsEditor/QuestionOptionsEditor";
import type { QuestionType } from "../../../types/form";

interface QuestionEditorProps {
  id: string;
  label: string;
  type: QuestionType;
  options?: string[];
  onLabelChange: (id: string, value: string) => void;
  onTypeChange: (id: string, value: QuestionType) => void;
  onRemove: (id: string) => void;
  onAddOption: (id: string) => void;
  onOptionChange: (id: string, optionIndex: number, value: string) => void;
  onRemoveOption: (id: string, optionIndex: number) => void;
}

export default function QuestionEditor({
  id,
  label,
  type,
  options = [],
  onLabelChange,
  onTypeChange,
  onRemove,
  onAddOption,
  onOptionChange,
  onRemoveOption,
}: QuestionEditorProps) {
  const isChoiceType = type === "MULTIPLE_CHOICE" || type === "CHECKBOX";

  return (
    <li>
      <div>
        <label htmlFor={`label-${id}`}>Question Label</label>
        <input
          id={`label-${id}`}
          type="text"
          value={label}
          onChange={(event) => onLabelChange(id, event.target.value)}
        />
      </div>

      <div>
        <label htmlFor={`type-${id}`}>Question Type</label>
        <select
          id={`type-${id}`}
          value={type}
          onChange={(event) =>
            onTypeChange(id, event.target.value as QuestionType)
          }
        >
          <option value="TEXT">Text</option>
          <option value="MULTIPLE_CHOICE">Multiple Choice</option>
          <option value="CHECKBOX">Checkbox</option>
          <option value="DATE">Date</option>
        </select>
      </div>

      {isChoiceType && (
        <QuestionOptionsEditor
          questionId={id}
          options={options}
          onAddOption={onAddOption}
          onOptionChange={onOptionChange}
          onRemoveOption={onRemoveOption}
        />
      )}

      <button type="button" onClick={() => onRemove(id)}>
        Remove Question
      </button>
    </li>
  );
}
