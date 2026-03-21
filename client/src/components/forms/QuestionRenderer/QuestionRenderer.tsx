import type { Question } from "../../../types/form";
import css from "./QuestionRenderer.module.css";

interface QuestionRendererProps {
  question: Question;
  value: string | string[] | undefined;
  onTextOrDateChange: (questionId: string, value: string) => void;
  onRadioChange: (questionId: string, value: string) => void;
  onCheckboxChange: (
    questionId: string,
    option: string,
    checked: boolean,
  ) => void;
}

export default function QuestionRenderer({
  question,
  value,
  onTextOrDateChange,
  onRadioChange,
  onCheckboxChange,
}: QuestionRendererProps) {
  return (
    <div className={css.wrapper}>
      <p className={css.label}>{question.label}</p>

      {question.type === "TEXT" && (
        <input
          type="text"
          value={typeof value === "string" ? value : ""}
          onChange={(event) =>
            onTextOrDateChange(question.id, event.target.value)
          }
          className={css.input}
        />
      )}

      {question.type === "DATE" && (
        <input
          type="date"
          value={typeof value === "string" ? value : ""}
          onChange={(event) =>
            onTextOrDateChange(question.id, event.target.value)
          }
          className={css.dateInput}
        />
      )}

      {question.type === "MULTIPLE_CHOICE" && (
        <div className={css.optionsList}>
          {question.options?.map((option) => (
            <label key={option} className={css.optionLabel}>
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={value === option}
                onChange={() => onRadioChange(question.id, option)}
                className={css.radio}
              />
              <span className={css.optionText}>{option}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === "CHECKBOX" && (
        <div className={css.optionsList}>
          {question.options?.map((option) => {
            const selected = Array.isArray(value) ? value : [];

            return (
              <label key={option} className={css.optionLabel}>
                <input
                  type="checkbox"
                  value={option}
                  checked={selected.includes(option)}
                  onChange={(event) =>
                    onCheckboxChange(question.id, option, event.target.checked)
                  }
                  className={css.checkbox}
                />
                <span className={css.optionText}>{option}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
