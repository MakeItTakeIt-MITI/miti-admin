import { useSearchParams } from "react-router-dom";
import { usePrivateDetails } from "./query/usePrivateInquiryDetails";
import { usePrivateInquiryAnswer } from "./query/usePrivateInquiryAnswer";
import { useState } from "react";
import { useAddPrivateInquiryAnswer } from "./mutation/useAddPrivateInquiryAnswer";

export const usePrivateInquiryDetailsPage = () => {
  const [replyContent, setReplyContent] = useState("");

  const [searchParams] = useSearchParams();
  const inquiryId = searchParams.get("inquiryId");
  const inquiryIdNumber = Number(inquiryId);

  const { mutate: privateInquiryReply } =
    useAddPrivateInquiryAnswer(inquiryIdNumber);

  const handleSubmitReply = () => {
    privateInquiryReply({
      content: replyContent,
    });
    setReplyContent("");
  };

  const { data } = usePrivateDetails(inquiryIdNumber);

  const { data: answerData } = usePrivateInquiryAnswer(inquiryIdNumber);

  const inquiryDetailData = data?.data || "";
  const inquiryAnswerData = answerData?.data || "";

  return {
    inquiryDetailData,
    inquiryAnswerData,
    handleSubmitReply,
    setReplyContent,
    replyContent,
  };
};
