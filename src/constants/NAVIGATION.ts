import GroupIcon from "@mui/icons-material/Group";
import FlagIcon from "@mui/icons-material/Flag";
import PaymentIcon from "@mui/icons-material/Payment";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ReceiptIcon from "@mui/icons-material/Receipt";

export const NAVIGATION = [
    { title: "회원 목록", path: "/users?page=1", icon: GroupIcon },
    { title: "경기 목록", path: "/games?page=1", icon: SportsBasketballIcon },
    { title: "신고 목록", path: "/reports?page=1", icon: FlagIcon },
    { title: "정산금 요청 목록", path: "/settlements?page=1", icon: PaymentIcon },
    { title: "유저 문의 목록", path: "/support?page=1", icon: SupportAgentIcon },
    { title: "결제완료 목록", path: "/payments?page=1", icon: ReceiptIcon },
];