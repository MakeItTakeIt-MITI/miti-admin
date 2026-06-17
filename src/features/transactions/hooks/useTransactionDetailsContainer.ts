import { useEffect, useState } from "react";
import { useTransferStatusesPage } from "./useTransactionsPage";
import { useTransferRequestDetails } from "./query/useTransferRequestDetails";
import useEditTransferStatus from "./mutation/useEditTransferStatus";
import { TransferStatus } from "../interface/settlements";

export const useTransactionDetailsContainer = () => {
  const { rows } = useTransferStatusesPage();

  const [openId, setOpenId] = useState<number | null>(null);

  const { data } = useTransferRequestDetails(openId);
  const detailData = data?.data ?? null;
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

  const formatPhone = (phone?: string) => {
    if (!phone) return "-";
    let digits = phone.replace(/\D/g, "");
    if (digits.startsWith("82")) digits = "0" + digits.slice(2);
    if (digits.length === 11)
      return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    if (digits.length === 10)
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    return phone;
  };

  const [statusValue, setStatusValue] = useState<string>("");

  useEffect(() => {
    if (detailData?.transfer_status) {
      setStatusValue(detailData.transfer_status);
    }
  }, [detailData]);

  const { mutate: editTransferStatus } = useEditTransferStatus(openId);

  const handleUpdateStatus = (transfer_status: TransferStatus) => {
    editTransferStatus({ transfer_status });
  };

  return {
    openId,
    setOpenId,
    handleClose,
    detailData,
    formatPhone,
    badgeCls,
    statusValue,
    setStatusValue,
    editTransferStatus,
    handleUpdateStatus,
    rows,
  };
};
