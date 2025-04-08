import { useMutation } from "@tanstack/react-query";
import { addInquiryReply } from "../api/support";

export const useInquiryReplyHook = () => {
  return useMutation({
    mutationFn: ({
      questionId,
      content,
    }: {
      questionId: number;
      content: string;
    }) => addInquiryReply(questionId, content),
  });
};
