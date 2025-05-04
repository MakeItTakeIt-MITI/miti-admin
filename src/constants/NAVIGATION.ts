import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FlagIcon from "@mui/icons-material/Flag";
import PaymentIcon from "@mui/icons-material/Payment";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ReceiptIcon from "@mui/icons-material/Receipt";

export const NAVIGATION = [
    { title: "대시보드", path: "/dashboard", icon: DashboardIcon },
    { title: "회원 목록", path: "/users", icon: GroupIcon },
    { title: "경기 목록", path: "/games", icon: SportsBasketballIcon },
    { title: "신고 목록", path: "/reports", icon: FlagIcon },
    { title: "정산금 요청 목록", path: "/settlements", icon: PaymentIcon },
    { title: "유저 문의 목록", path: "/support", icon: SupportAgentIcon },
    { title: "결제완료 목록", path: "/payments", icon: ReceiptIcon },
];