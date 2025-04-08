// import Sidebar from "../components/Sidebar";
// import PaymentIcon from "@mui/icons-material/Payment";

import { Link } from "react-router-dom";
import { PageHeader } from "../../features/common/PageHeader";
import { PageLayout } from "../../features/common/PageLayout";
import { usePaymentsHook } from "../../features/settlements/hooks/usePaymentsHook";
import { SettlementsField } from "../../features/settlements/interface/settlements";
import FeedIcon from "@mui/icons-material/Feed";

const Settlements = () => {
  // const { data: paymentsData } = usePaymentsListhook(currentPage);
  // const endIndex = paymentsData?.data.end_index;

  // const { data: paymentDetailsData } = usePaymentDetailsHook(paymentId)
  const { data: paymentsData } = usePaymentsHook();
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

  return (
    <>
      <PageHeader title="정산 목록" />
      <PageLayout>
        <section className="pt-[2rem]   h-[18rem]  px-[2rem] w-full   bg-[#fff] ">
          <div className="flex items-center gap-4 ">
            <table className="border-collapse     w-full ">
              <thead>
                <tr>
                  {headers.map((header, i) => (
                    <th key={i} className="  w-[120px]  ">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              {paymentsData?.data.page_content.map((page: SettlementsField) => (
                <tbody>
                  <td className="w-[120px] text-center px-4 py-1">
                    {page?.id}
                  </td>
                  <td className="w-[120px] text-center px-4 py-1">
                    {page?.account}
                  </td>
                  <td className="w-[120px] text-center px-4 py-1">
                    {page?.transfer_status}
                  </td>
                  <td className="w-[120px] text-center px-4 py-1">
                    {page?.amount}
                  </td>
                  <td className="w-[120px] text-center px-4 py-1">
                    {page?.account_bank}
                  </td>
                  <td className="w-[120px] text-center px-4 py-1">
                    {page?.account_number}
                  </td>
                  <td className="w-[120px] text-center px-4 py-1">
                    {page?.account_holder}
                  </td>{" "}
                  <td className="w-[120px] text-center px-4 py-1">
                    {page?.created_at.slice(0, 10)}
                  </td>
                  <td className="w-[120px] text-center px-4 py-1">
                    <Link
                      to={`${page.id}`}
                      className="font-semibold  w-[10%] text-center "
                    >
                      <FeedIcon sx={{ color: "gray" }} />
                    </Link>
                  </td>
                </tbody>
              ))}
            </table>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default Settlements;
