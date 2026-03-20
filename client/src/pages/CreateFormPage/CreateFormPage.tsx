import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateFormMutation } from "../../store/api";

export default function CreateFormPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [createForm, { isLoading, error }] = useCreateFormMutation();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) return;

    try {
      await createForm({
        title,
        description,
        questions: [],
      }).unwrap();

      navigate("/");
    } catch (err) {
      console.error("Failed to create form:", err);
    }
  };

  return (
    <div>
      <h1>Create New Form</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Form"}
        </button>

        {error && <p>Failed to create form.</p>}
      </form>
    </div>
  );
}
