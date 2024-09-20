import { Button } from "@mui/material";
import TransactionDetails from "./TransactionDetails";
import UserDetails from "./UserDetails";
import DrawerHeader from "../common/DrawerHeader";

interface DrawerProps {
  setOpenDrawer: (arg: boolean) => void;
}

const Drawer = ({ setOpenDrawer }: DrawerProps) => {
  return (
    <aside
      onClick={() => setOpenDrawer(false)}
      className="z-[999] fixed right-0 top-0 bottom-0 left-0 h-full w-full bg-gray-800 bg-opacity-70"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          transition: "transform 0.3s ease-in-out",
          transform: "translateX(0)",
        }}
        className="flex flex-col justify-between absolute  top-0 right-0 bottom-0 bg-white w-[25rem] drawer-closing   "
      >
        <div className="flex flex-col  space-y-8">
          <DrawerHeader setOpenDrawer={setOpenDrawer} />
          <div className="px-[2rem] space-y-8">
            <UserDetails />
            <TransactionDetails />
          </div>
        </div>
        {/* button */}
        <div className="w-full p-4 ">
          <Button
            style={{
              height: "52px",
              width: "100%",
              fontSize: "14px",
              fontWeight: 500,
            }}
            variant="contained"
          >
            저장하기
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Drawer;
