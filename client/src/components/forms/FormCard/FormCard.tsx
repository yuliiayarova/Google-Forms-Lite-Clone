import { Link } from "react-router-dom";

interface FormCardProps {
  id: string;
  title: string;
  description?: string;
}

export default function FormCard({ id, title, description }: FormCardProps) {
  return (
    <li
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        marginBottom: "12px",
        borderRadius: "8px",
      }}
    >
      <h2>{title}</h2>
      <p>{description || "No description"}</p>

      <div style={{ display: "flex", gap: "12px" }}>
        <Link to={`/forms/${id}/fill`}>Open Form</Link>
        <Link to={`/forms/${id}/responses`}>Responses</Link>
      </div>
    </li>
  );
}
