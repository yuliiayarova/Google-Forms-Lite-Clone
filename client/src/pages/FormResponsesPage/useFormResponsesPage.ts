import { useParams } from "react-router-dom";
import { useGetFormByIdQuery, useGetResponsesQuery } from "../../store/api";

export function useFormResponsesPage() {
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

  const form = formData?.data?.form;
  const responses = responsesData?.data?.responses ?? [];

  const getQuestionLabel = (questionId: string) => {
    const question = form?.questions.find((q) => q.id === questionId);
    return question?.label ?? "Unknown question";
  };

  return {
    id,
    form,
    responses,
    isFormLoading,
    isResponsesLoading,
    formError,
    responsesError,
    getQuestionLabel,
  };
}
