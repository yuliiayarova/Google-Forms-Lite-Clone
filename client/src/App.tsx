import { useGetFormsQuery } from "./store/api";

function App() {
  const { data, isLoading, error } = useGetFormsQuery();

  console.log("data", data);
  console.log("error", error);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const forms = data?.data?.forms ?? [];

  return (
    <div>
      <h1>Forms</h1>
      {forms.length === 0 ? (
        <p>No forms yet</p>
      ) : (
        forms.map((form: any) => <div key={form.id}>{form.title}</div>)
      )}
    </div>
  );
}

export default App;
