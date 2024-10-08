import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnswerField, answerInquiry } from "../api/support";

export const useAnswerInquiryHook = (inquiryId: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: AnswerField) => answerInquiry(inquiryId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Inquiry Details"] });
    },
  });
};
