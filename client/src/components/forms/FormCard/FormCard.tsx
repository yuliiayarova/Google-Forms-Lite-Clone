import { Link } from "react-router-dom";
import css from "./FormCard.module.css";

interface FormCardProps {
  id: string;
  title: string;
  description?: string;
}

export default function FormCard({ id, title, description }: FormCardProps) {
  return (
    <li className={css.card}>
      <div className={css.header}>
        <h2 className={css.title}>{title}</h2>
        <p
          className={
            description
              ? css.description
              : `${css.description} ${css.emptyDescription}`
          }
        >
          {description || "No description"}
        </p>
      </div>

      <div className={css.actions}>
        <Link to={`/forms/${id}/fill`} className={css.primaryLink}>
          Open Form
        </Link>

        <Link to={`/forms/${id}/responses`} className={css.secondaryLink}>
          Responses
        </Link>
      </div>
    </li>
  );
}
