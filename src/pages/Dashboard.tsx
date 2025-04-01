import { Link } from "react-router-dom";

import GroupIcon from "@mui/icons-material/Group";
import FlagIcon from "@mui/icons-material/Flag";
import PaymentIcon from "@mui/icons-material/Payment";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ReceiptIcon from "@mui/icons-material/Receipt";

const Dashboard = () => {
  return (
    <section className="min-h-screen bg-[#fff] pt-[6rem] py-[4rem]">
      <div className="max-w-[62rem]  mx-auto space-y-4 ">
        <h1 className="font-bold text-3xl">바로가기</h1>
        <div className="flex gap-4 ">
          <div className="bg-[#000] text-white  w-[15rem] h-[6rem] rounded-xl p-3 flex  items-center  justify-center drop-shadow-sm">
            <Link to="/users" className="flex flex-col gap-1 items-center">
              {" "}
              <GroupIcon />
              <span>회원</span>
            </Link>
          </div>
          <div className="bg-[#000] text-white w-[15rem] h-[6rem] rounded-xl p-3 flex  items-center  justify-center drop-shadow-sm">
            <Link to="/reports" className="flex flex-col gap-1 items-center">
              <FlagIcon /> <span> 신고</span>
            </Link>
          </div>
          <div className="bg-[#000] text-white w-[15rem] h-[6rem] rounded-xl p-3 flex  items-center  justify-center drop-shadow-sm">
            <Link
              to="/settlements"
              className="flex flex-col gap-1 items-center"
            >
              <PaymentIcon /> <span> 정산</span>
            </Link>
          </div>
          <div className="bg-[#000] text-white w-[15rem] h-[6rem] rounded-xl p-3 flex  items-center  justify-center drop-shadow-sm">
            <Link to="/games" className="flex flex-col gap-1 items-center">
              <SportsBasketballIcon /> <span> 경기</span>
            </Link>
          </div>
        </div>
        <div className="flex gap-4 ">
          <div className="bg-[#000] text-white w-[15rem] h-[6rem] rounded-xl p-3 flex  items-center justify-center drop-shadow-sm">
            <Link to="/support" className="flex flex-col gap-1 items-center">
              <SupportAgentIcon /> <span>문의</span>
            </Link>
          </div>
          <div className="bg-[#000] text-white w-[15rem] h-[6rem] rounded-xl p-3 flex  items-center justify-center drop-shadow-sm">
            <Link to="/payments" className="flex flex-col gap-1 items-center">
              <ReceiptIcon /> <span>결제</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
