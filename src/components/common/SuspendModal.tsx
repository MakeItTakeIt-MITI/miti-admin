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
          <TextField
            style={{
              width: "100%",
            }}
            id="outlined-basic"
            label="정지기간을 입혁해 주세요."
            variant="outlined"
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="flex items-center justify-center gap-8">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSuspendUser()}
            >
              정지
            </Button>
            <Button onClick={handleClose} variant="contained" color="error">
              나가기
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SuspendModal;
