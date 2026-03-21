import { Link } from "react-router-dom";
import { useGetFormsQuery } from "../../store/api";
import FormCard from "../../components/forms/FormCard/FormCard";

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
            <FormCard
              key={form.id}
              id={form.id}
              title={form.title}
              description={form.description}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
