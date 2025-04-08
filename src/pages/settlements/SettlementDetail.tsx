import { useParams } from "react-router-dom";
import { usePaymentsDetailHook } from "../../features/settlements/hooks/usePaymentsDetailHook";

export const SettlementDetail = () => {
  const { settlementId } = useParams();
  const settlemntIdNum = Number(settlementId);
  const { data: settlementData } = usePaymentsDetailHook(settlemntIdNum);
  console.log(settlementData);
  return <></>;
};
