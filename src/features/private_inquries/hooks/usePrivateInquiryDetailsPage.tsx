import { useSearchParams } from "react-router-dom";
import { usePrivateDetails } from "./query/usePrivateInquiryDetails";

export const usePrivateInquiryDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const inquiryId = searchParams.get("inquiryId");
  const inquiryIdNumber = Number(inquiryId);

  const { data } = usePrivateDetails(inquiryIdNumber);

  const inquiryDetailData = data?.data;

  return { inquiryDetailData };
};
