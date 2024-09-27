import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useSuspendUserHook } from "../../hook/useSuspendUserHook";
import { useState } from "react";

const SuspendModal = ({
  setOpen,
  open,
  userId,
}: {
  setOpen: (arg: boolean) => void;
  open: boolean;
  userId: number | null;
}) => {
  const handleClose = () => setOpen(false);
  const { mutate } = useSuspendUserHook(userId);
  const [input, setInput] = useState<null | number | string>(null);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "12px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  };

  function handleSuspendUser() {
    const days = Number(input);
    mutate({ days: days });
    setOpen(false);
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <FormLabel
            style={{
              fontSize: " 14px",
              fontWeight: "bold",
            }}
          >
            정지 기간을 숫자로 입력해주세요.
          </FormLabel> */}
          <TextField
            type="number"
            style={{
              width: "100%",
            }}
            id="outlined-basic"
            label="   정지 기간을 입력해주세요."
            variant="outlined"
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="flex items-center justify-center gap-3 w-full">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSuspendUser()}
              style={{ width: "100%" }}
            >
              적용
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              color="error"
              style={{ width: "100%" }}
            >
              나가기
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SuspendModal;
