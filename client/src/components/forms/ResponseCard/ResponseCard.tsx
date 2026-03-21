import css from "./ResponseCard.module.css";

interface ResponseAnswer {
  questionId: string;
  value: string;
}

interface ResponseItem {
  id: string;
  answers: ResponseAnswer[];
}

interface ResponseCardProps {
  response: ResponseItem;
  index: number;
  getQuestionLabel: (questionId: string) => string;
}

export default function ResponseCard({
  response,
  index,
  getQuestionLabel,
}: ResponseCardProps) {
  return (
    <div className={css.card}>
      <div className={css.header}>
        <div className={css.badge}>{index + 1}</div>
        <h2 className={css.title}>Response</h2>
      </div>

      <ul className={css.answersList}>
        {response.answers.map((answer) => (
          <li
            key={`${response.id}-${answer.questionId}`}
            className={css.answerItem}
          >
            <span className={css.question}>
              {getQuestionLabel(answer.questionId)}
            </span>

            <span
              className={
                answer.value ? css.value : `${css.value} ${css.emptyValue}`
              }
            >
              {answer.value || "No answer"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
