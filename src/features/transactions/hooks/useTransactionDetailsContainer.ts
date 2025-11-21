import { useEffect, useState } from "react";
import { useTransferStatusesPage } from "./useTransactionsPage";

export const useTransactionDetailsContainer = () => {
    const { rows } = useTransferStatusesPage()

    const [openId, setOpenId] = useState<number | null>(null);

    const handleClose = () => setOpenId(null);

    // ESC 닫기
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        if (openId !== null) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [openId]);

    const mockDetail = {
        data: {
            id: 7,
            transfer_status: "waiting",
            amount: 20000,
            account_bank: "DAEGUBANK",
            account_holder: "테스트",
            account_number: "424023840923843",
            created_at: "2025-02-28T04:05:27.654400+09:00",
            account: {
                id: 3,
                account_type: "personal",
                status: "active",
                balance: 1000000,
                point: 0,
                user: {
                    id: 3,
                    email: "testuser2@makeittakeit.kr",
                    nickname: "testuser2",
                    name: "테스트유저",
                    birthday: "2000-01-01",
                    signup_method: "email",
                    phone: "01011111111",
                    created_at: "2025-01-12T17:43:27.155065+09:00",
                    profile_image_url:
                        "https://image-dev.makeittakeit.kr/user-profile-images/user_3.png",
                    player_profile: {
                        gender: "male",
                        height: null,
                        weight: 80,
                        position: null,
                        role: null,
                    },
                },
            },
        },
    };

    const badgeCls = (s?: string) =>
        s === "completed"
            ? "bg-emerald-600/20 text-emerald-300 ring-1 ring-inset ring-emerald-500/30"
            : s === "waiting"
                ? "bg-amber-600/20 text-amber-300 ring-1 ring-inset ring-amber-500/30"
                : s === "processing"
                    ? "bg-blue-600/20 text-blue-300 ring-1 ring-inset ring-blue-500/30"
                    : "bg-rose-600/20 text-rose-300 ring-1 ring-inset ring-rose-500/30";


    const detailData =
        openId !== null
            ? {
                ...(rows.find((r) => r.id === openId) || mockDetail.data),
            }
            : null;

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
    return {
        openId,
        setOpenId,
        handleClose,
        detailData,
        formatPhone,
        badgeCls
    };
}