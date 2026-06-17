import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPrivateInquiresAnswer } from "../../api/private_inquriies";

export const useAddPrivateInquiryAnswer = (inquiryId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addPrivateInquiryAnswer", inquiryId],
    mutationFn: ({ content }: { content: string }) =>
      postPrivateInquiresAnswer(inquiryId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["privateInquiryAnswer", inquiryId],
      });
    },
  });
};
