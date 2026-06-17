import { useSearchParams } from "react-router-dom";
import { useInquiryDetailsHook } from "./query/useInquiryDetailsHook";
import { useMemo, useState } from "react";
import { useInquiryReplyHook } from "./mutation/useInquiryReplyHook";

export const useInquiryDetailPage = () => {
  const [replyContent, setReplyContent] = useState("");

  const [searchParams] = useSearchParams();
  const inquiryId = searchParams.get("inquiryId");
  const inquiryIdNumber = Number(inquiryId);

  const { data: inquiryDetails } = useInquiryDetailsHook(inquiryIdNumber);

  const { mutate: replyToInquiry } = useInquiryReplyHook();

  const handleSubmitReply = () => {
    replyToInquiry({
      questionId: inquiryDetails?.data.id,
      content: replyContent,
    });
    setReplyContent("");
  };

  const data = inquiryDetails?.data;
  const answerStatus = useMemo(
    () => (data?.num_of_answers === 0 ? "미답변" : "답변완료"),
    [data?.num_of_answers],
  );
  const statusCls =
    data?.num_of_answers === 0
      ? "bg-rose-600/20 text-rose-300 ring-1 ring-inset ring-rose-500/30"
      : "bg-emerald-600/20 text-emerald-300 ring-1 ring-inset ring-emerald-500/30";

  const formatKoreanPhone = (phone?: string) => {
    if (!phone) return "-";
    let digits = phone.replace(/\D/g, "");
    if (digits.startsWith("82")) digits = "0" + digits.slice(2);
    if (digits.length === 11)
      return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    if (digits.length === 10)
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    return phone;
  };

  return {
    inquiryDetails,
    handleSubmitReply,
    setReplyContent,
    replyContent,
    answerStatus,
    statusCls,
    formatKoreanPhone,
    data,
  };
};
