import { Link } from "react-router-dom";
import { useGetFormsQuery } from "../../store/api";
import FormCard from "../../components/forms/FormCard/FormCard";
import Loader from "../../components/Loader/Loader";
import css from "./HomePage.module.css";

export default function HomePage() {
  const { data, isLoading, error } = useGetFormsQuery();

  if (isLoading) {
    return (
      <div className={css.page}>
        <Loader />
      </div>
    );
  }
  if (error) return <p className={css.error}>Failed to load forms.</p>;

  const forms = data?.data?.forms ?? [];

  return (
    <div className={css.page}>
      <div className={css.container}>
        <div className={css.header}>
          <h1 className={css.title}>Forms</h1>

          <div className={css.actions}>
            <Link to="/forms/new" className={css.createLink}>
              Create New Form
            </Link>
          </div>
        </div>

        <div className={css.section}>
          {forms.length === 0 ? (
            <p className={css.emptyState}>No forms yet</p>
          ) : (
            <ul className={css.list}>
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
      </div>
    </div>
  );
}
