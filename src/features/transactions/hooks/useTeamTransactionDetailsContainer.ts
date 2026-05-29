import { useEffect, useState } from "react";
import { useTeamTransferStatusesPage } from "./useTeamTransactionsPage";
import { useTeamTransferRequestDetails } from "./query/useTeamTransferRequestDetails";
import useEditTeamTransferStatus from "./mutation/useEditTeamTransferStatus";
import { TransferStatus } from "../interface/settlements";

export const useTeamTransactionDetailsContainer = () => {
  const { rows } = useTeamTransferStatusesPage();

  const [openId, setOpenId] = useState<number | null>(null);

  const { data } = useTeamTransferRequestDetails(openId);
  const detailData = data ?? null;
  const handleClose = () => setOpenId(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (openId !== null) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  const badgeCls = (s?: string) =>
    s === "completed"
      ? "bg-emerald-600/20 text-emerald-300 ring-1 ring-inset ring-emerald-500/30"
      : s === "waiting"
        ? "bg-amber-600/20 text-amber-300 ring-1 ring-inset ring-amber-500/30"
        : "bg-rose-600/20 text-rose-300 ring-1 ring-inset ring-rose-500/30";

  const [statusValue, setStatusValue] = useState<string>("");

  useEffect(() => {
    if (detailData?.transfer_status) {
      setStatusValue(detailData.transfer_status);
    }
  }, [detailData]);

  const { mutate: editTeamTransferStatus } = useEditTeamTransferStatus(openId);

  const handleUpdateStatus = (transfer_status: TransferStatus) => {
    editTeamTransferStatus({ transfer_status });
  };

  return {
    openId,
    setOpenId,
    handleClose,
    detailData,
    badgeCls,
    statusValue,
    setStatusValue,
    editTeamTransferStatus,
    handleUpdateStatus,
    rows,
  };
};
