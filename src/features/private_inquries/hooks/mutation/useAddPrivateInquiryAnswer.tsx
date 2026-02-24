import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPrivateInquiresAnswer } from "../../api/private_inquriies";
import { toast } from "react-toastify";

export const useAddPrivateInquiryAnswer = (inquiryId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addPrivateInquiryAnswer", inquiryId],
    mutationFn: ({ content }: { content: string }) =>
      postPrivateInquiresAnswer(inquiryId, { content }),
    onSuccess: (res) => {
      if (res.status_code === 201) {
        toast.success("답변이 등록되었습니다.");
      }
      queryClient.invalidateQueries({
        queryKey: ["privateInquiryAnswer", inquiryId],
      });
    },
    onError: () => {
      toast.error("답변 등록에 실패했습니다.");
    },
  });
};
