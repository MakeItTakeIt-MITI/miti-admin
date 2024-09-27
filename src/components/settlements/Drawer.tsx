import { Button, FormControl, InputLabel, MenuItem } from "@mui/material";
import TransactionDetails from "./TransactionDetails";
import UserDetails from "./UserDetails";
import DrawerHeader from "../common/DrawerHeader";
import { TransferField } from "../../interface/payment";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { usePaymentStatusHook } from "../../hook/usePaymentStatusHook";

interface DrawerProps {
  paymentDetailsData: {
    status_code: number;
    message: string;
    data: TransferField;
  };
  setOpenDrawer: (arg: boolean) => void;
}

const Drawer = ({ paymentDetailsData, setOpenDrawer }: DrawerProps) => {
  const [transferStatus, setTransferStatus] = useState("");

  const { mutate: paymentStatusMutate } = usePaymentStatusHook();

  const handleChange = (event: SelectChangeEvent) => {
    setTransferStatus(event.target.value as string);
  };

  const handleChangePaymentStatus = () => {
    paymentStatusMutate({
      transferId: paymentDetailsData?.data.id,
      data: {
        transfer_status:
          transferStatus === ""
            ? paymentDetailsData?.data.transfer_status
            : transferStatus,
      },
    });
    setOpenDrawer(false);
  };
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
            <TransactionDetails paymentDetailsData={paymentDetailsData?.data} />
          </div>
        </div>
        {/* button */}
        <div className="w-full p-4 space-y-4 ">
          <FormControl fullWidth>
            <InputLabel
              style={{
                backgroundColor: "#fff",
                paddingRight: "4px",
                paddingLeft: " 4px",
              }}
            >
              {" "}
              이체 상태를 변경하기
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={transferStatus}
              onChange={handleChange}
              style={{
                border: "none",
              }}
            >
              <MenuItem
                value="completed"
                disabled={
                  paymentDetailsData?.data.transfer_status === "completed"
                }
              >
                이체 완료
              </MenuItem>
              <MenuItem
                value="waiting"
                disabled={
                  paymentDetailsData?.data.transfer_status === "waiting"
                }
              >
                이체 대기중
              </MenuItem>
              <MenuItem
                value="declined"
                disabled={
                  paymentDetailsData?.data.transfer_status === "declined"
                }
              >
                이체 거부됨
              </MenuItem>
            </Select>
          </FormControl>
          <Button
            style={{
              height: "52px",
              width: "100%",
              fontSize: "14px",
              fontWeight: 500,
            }}
            variant="contained"
            onClick={handleChangePaymentStatus}
          >
            저장하기
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Drawer;
