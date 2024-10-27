import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { Button } from "@mui/material";

const Logout = () => {
  const { logout } = useUserStore();

  const router = useNavigate();

  return (
    <Button
      onClick={() => {
        logout();
        router("/");
      }}
      variant="contained"
      sx={{
        backgroundColor: "#000000",
        color: "#FFFFFF",
        "&:hover": {
          opacity: "90p",
        },
      }}
    >
      로그아웃
    </Button>
  );
};

export default Logout;
