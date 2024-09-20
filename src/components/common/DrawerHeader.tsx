import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CloseIcon from "@mui/icons-material/Close";

const DrawerHeader = ({ setOpenDrawer }) => {
  return (
    <div className="flex justify-between p-4 border-b border-gray-400">
      <div className="flex items-center gap-2">
        <AccountBalanceIcon />
        <h1 className="font-bold ">정산금 상세 정보</h1>
      </div>
      {/* change to button later */}
      <div onClick={() => setOpenDrawer(false)} className="cursor-pointer">
        <CloseIcon />
      </div>
    </div>
  );
};

export default DrawerHeader;
