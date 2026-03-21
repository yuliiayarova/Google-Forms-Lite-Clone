import type { Question } from "../../../types/form";

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
    <div style={{ marginBottom: "16px" }}>
      <p>
        <strong>{question.label}</strong>
      </p>

      {question.type === "TEXT" && (
        <input
          type="text"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onTextOrDateChange(question.id, e.target.value)}
        />
      )}

      {question.type === "DATE" && (
        <input
          type="date"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onTextOrDateChange(question.id, e.target.value)}
        />
      )}

      {question.type === "MULTIPLE_CHOICE" && (
        <div>
          {question.options?.map((option) => (
            <label key={option} style={{ display: "block" }}>
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={value === option}
                onChange={() => onRadioChange(question.id, option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}

      {question.type === "CHECKBOX" && (
        <div>
          {question.options?.map((option) => {
            const selected = Array.isArray(value) ? value : [];

            return (
              <label key={option} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  value={option}
                  checked={selected.includes(option)}
                  onChange={(e) =>
                    onCheckboxChange(question.id, option, e.target.checked)
                  }
                />
                {option}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
