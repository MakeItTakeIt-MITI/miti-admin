import { useMemo } from "react";
import { useReportsListHook } from "./query/useReportsListHook";

export const useReportsPage = () => {
    const { data: reportsData, hasNextPage, hasPreviousPage, fetchNextPage, fetchPreviousPage } = useReportsListHook();

    // flatten the paginated data
    const reportsDataPage = reportsData?.pages.flatMap(
        (page) => page?.data?.items ?? []
    );


    const rows = useMemo(() => {
        if (!reportsDataPage) return [];
        if (Array.isArray(reportsDataPage)) return reportsDataPage;
        return reportsDataPage;
    }, [reportsDataPage]);



    return {
        reportsDataPage,
        rows,
        hasNextPage,
        hasPreviousPage,
        fetchNextPage,
        fetchPreviousPage
    }
}
