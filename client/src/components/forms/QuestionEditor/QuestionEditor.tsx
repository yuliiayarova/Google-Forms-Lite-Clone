import QuestionOptionsEditor from "../QuestionOptionsEditor/QuestionOptionsEditor";
import type { QuestionType } from "../../../types/form";
import css from "./QuestionEditor.module.css";

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
    <li className={css.item}>
      <div className={css.card}>
        <div className={css.fieldGroup}>
          <label htmlFor={`label-${id}`} className={css.label}>
            Question Label
          </label>
          <input
            id={`label-${id}`}
            type="text"
            value={label}
            onChange={(event) => onLabelChange(id, event.target.value)}
            className={css.input}
          />
        </div>

        <div className={css.fieldGroup}>
          <label htmlFor={`type-${id}`} className={css.label}>
            Question Type
          </label>
          <select
            id={`type-${id}`}
            value={type}
            onChange={(event) =>
              onTypeChange(id, event.target.value as QuestionType)
            }
            className={css.select}
          >
            <option value="TEXT">Text</option>
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="CHECKBOX">Checkbox</option>
            <option value="DATE">Date</option>
          </select>
        </div>

        {isChoiceType && (
          <div className={css.optionsWrapper}>
            <QuestionOptionsEditor
              questionId={id}
              options={options}
              onAddOption={onAddOption}
              onOptionChange={onOptionChange}
              onRemoveOption={onRemoveOption}
            />
          </div>
        )}

        <div className={css.actions}>
          <button
            type="button"
            onClick={() => onRemove(id)}
            className={css.removeButton}
          >
            Remove Question
          </button>
        </div>
      </div>
    </li>
  );
}
