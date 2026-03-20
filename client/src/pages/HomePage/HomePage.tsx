import { Link } from "react-router-dom";
import { useGetFormsQuery } from "../../store/api";

export default function HomePage() {
  const { data, isLoading, error } = useGetFormsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load forms.</p>;

  const forms = data?.data?.forms ?? [];

  return (
    <div>
      <h1>Forms</h1>
      <Link to="/forms/new">Create New Form</Link>

      {forms.length === 0 ? (
        <p>No forms yet</p>
      ) : (
        <ul>
          {forms.map((form) => (
            <li key={form.id}>
              <h2>{form.title}</h2>
              <p>{form.description}</p>
              <Link to={`/forms/${form.id}/fill`}>View Form</Link>
              {" | "}
              <Link to={`/forms/${form.id}/responses`}>View Responses</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
