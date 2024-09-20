import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserDetails = () => {
  return (
    <div className="border border-gray-200 rounded-xl flex items-center gap-2 w-full h-[5rem] p-4 ">
      <AccountCircleIcon fontSize="large" />
      <div className="text-sm text-gray-400">
        <p className="truncate">giwfawf2@gmail.com</p>
        <p className="">이지원</p>
      </div>
    </div>
  );
};

export default UserDetails;
