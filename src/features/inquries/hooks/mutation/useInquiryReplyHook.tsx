import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addInquiryReply } from "../../api/support";
import { toast } from "react-toastify";

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
    onSuccess: (res) => {
      if (res.status_code === 201) {
        toast.success("답변이 등록되었습니다.");
      }
      queryClient.invalidateQueries({ queryKey: ["Inquiry Details"] });
    },
    onError: () => {
      toast.error("답변 등록에 실패했습니다. 다시 시도해주세요.");
    },
  });
};
