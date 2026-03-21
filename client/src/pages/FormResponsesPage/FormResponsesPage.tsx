import { useParams } from "react-router-dom";
import { useGetFormByIdQuery, useGetResponsesQuery } from "../../store/api";

export default function FormResponsesPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: formData,
    isLoading: isFormLoading,
    error: formError,
  } = useGetFormByIdQuery(id ?? "", {
    skip: !id,
  });

  const {
    data: responsesData,
    isLoading: isResponsesLoading,
    error: responsesError,
  } = useGetResponsesQuery(id ?? "", {
    skip: !id,
  });

  if (!id) return <p>Form id is missing.</p>;
  if (isFormLoading || isResponsesLoading) return <p>Loading...</p>;
  if (formError) return <p>Failed to load form.</p>;
  if (responsesError) return <p>Failed to load responses.</p>;

  const form = formData?.data?.form;
  const responses = responsesData?.data?.responses ?? [];

  if (!form) return <p>Form not found.</p>;

  const getQuestionLabel = (questionId: string) => {
    const question = form.questions.find((q) => q.id === questionId);
    return question?.label ?? "Unknown question";
  };

  return (
    <div>
      <h1>Responses for: {form.title}</h1>
      <p>{form.description}</p>

      {responses.length === 0 ? (
        <p>No responses yet.</p>
      ) : (
        <div>
          {responses.map((response, index) => (
            <div
              key={response.id}
              style={{
                border: "1px solid #ccc",
                padding: "16px",
                marginBottom: "16px",
                borderRadius: "8px",
              }}
            >
              <h2>Response {index + 1}</h2>

              <ul>
                {response.answers.map((answer) => (
                  <li key={`${response.id}-${answer.questionId}`}>
                    <p>
                      <strong>{getQuestionLabel(answer.questionId)}</strong>
                    </p>
                    <p>{answer.value || "No answer"}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
