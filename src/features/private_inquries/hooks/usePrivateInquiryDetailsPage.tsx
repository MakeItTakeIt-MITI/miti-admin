import { useSearchParams } from "react-router-dom";
import { usePrivateDetails } from "./query/usePrivateInquiryDetails";
import { usePrivateInquiryAnswer } from "./query/usePrivateInquiryAnswer";

export const usePrivateInquiryDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const inquiryId = searchParams.get("inquiryId");
  const inquiryIdNumber = Number(inquiryId);

  const { data } = usePrivateDetails(inquiryIdNumber);

  const { data: answerData } = usePrivateInquiryAnswer(inquiryIdNumber);

  const inquiryDetailData = data?.data || "";
  const inquiryAnswerData = answerData?.data || "";

  return { inquiryDetailData, inquiryAnswerData };
};
