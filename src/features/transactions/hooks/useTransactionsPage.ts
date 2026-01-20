import { useMemo, useState } from "react";
import { useGetTransferRequests } from "./query/useGetTransferRequests";

export const useTransferStatusesPage = () => {
    const [transferStatus] = useState<null | 'completed' | 'waiting' | 'declined'>(null);
    const {
        data,
        hasNextPage,
        hasPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        // isLoading,
    } = useGetTransferRequests(transferStatus);



    const transferRequestData = data?.pages?.flatMap(
        (page) => page?.data?.items
    );


    const rows = useMemo(() => {
        if (!transferRequestData) return [];
        if (Array.isArray(transferRequestData)) return transferRequestData;
        return transferRequestData;
    }, [transferRequestData]);





    return {
        transferRequestData,
        hasNextPage,
        hasPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        rows,

    };
};