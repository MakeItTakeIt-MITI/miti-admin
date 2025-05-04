import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addInquiryReply } from "../api/support";

export const useInquiryReplyHook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      questionId,
      content,
    }: {
      questionId: number;
      content: string;
    }) => addInquiryReply(questionId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Inquiry Details"] });
    },
  });
};
