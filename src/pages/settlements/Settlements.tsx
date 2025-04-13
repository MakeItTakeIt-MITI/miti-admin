// import Sidebar from "../components/Sidebar";
// import PaymentIcon from "@mui/icons-material/Payment";

import { Link } from "react-router-dom";
import { PageHeader } from "../../features/common/PageHeader";
import { PageLayout } from "../../features/common/PageLayout";
import { usePaymentsHook } from "../../features/settlements/hooks/usePaymentsHook";
// import { SettlementsField } from "../../features/settlements/interface/settlements";
import FeedIcon from "@mui/icons-material/Feed";
import { TableLayout } from "../../components/common/TableLayout";
import PaginationBtns from "../../components/common/PaginationBtns";
import { useState } from "react";

const Settlements = () => {
  // const { data: paymentsData } = usePaymentsListhook(currentPage);
  // const endIndex = paymentsData?.data.end_index;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // const { data: paymentDetailsData } = usePaymentDetailsHook(paymentId)
  const { data, isLoading } = usePaymentsHook();
  const endIndex = data?.data.end_index;
  const settlementsList = data?.data.page_content;

  const headers = [
    "id",
    "account",
    "transfer_status",
    "amount",
    "account_bank",
    "account_holder",
    "account_number",
    "created_at",
    "상세",
  ];
  const tableData =
    !isLoading && data?.status_code === 200
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        settlementsList.map((settlement: any) => [
          settlement.id,
          settlement.account,
          settlement.transfer_status,
          settlement.amount,
          settlement.account_bank,
          settlement.account_number,
          settlement.account_holder,
          `${settlement.created_at.slice(0, 10)}`,

          <Link
            to={`${settlement.id}`}
            className="inline-block w-full text-center"
          >
            <FeedIcon sx={{ color: "gray" }} />
          </Link>,
        ])
      : [];

  return (
    <>
      <PageHeader title="정산 목록" />
      <PageLayout>
        <div className="flex flex-col gap-2 ">
          {data?.status_code === 200 ? (
            <TableLayout
              headers={headers}
              data={tableData}
              context="정산 내역이 없습니다!"
            />
          ) : (
            <h1 className="flex items-center justify-center font-bold">
              오류 발생
            </h1>
          )}
        </div>
        <PaginationBtns
          spacing={2}
          count={endIndex}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </PageLayout>
    </>
  );
};

export default Settlements;
