

import { useSearchParams } from "react-router-dom";
import { useUsersListHook } from "./query/useUsersListHook";
import { useMemo } from "react";


const useUsersPage = () => {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search");



    // --- USERS LIST API/HOOK --- 
    const { data, hasNextPage, hasPreviousPage, fetchNextPage, fetchPreviousPage, isLoading } = useUsersListHook(search);

    // flatten the paginated data
    const usersDataPage = data?.pages?.flatMap(
        (page) => page?.data?.items
    );

    const rows = useMemo(() => {
        if (!usersDataPage) return [];
        if (Array.isArray(usersDataPage)) return usersDataPage;

        return usersDataPage;
    }, [usersDataPage]);

    return { data, search, usersDataPage, hasNextPage, hasPreviousPage, fetchNextPage, fetchPreviousPage, isLoading, rows }
};

export default useUsersPage;