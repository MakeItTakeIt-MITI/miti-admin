

import { useSearchParams } from "react-router-dom";
import { useUsersListHook } from "./query/useUsersListHook";


const useUsersPage = () => {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search");
    // const pageNow = page ? parseInt(page) : 1


    // --- USERS LIST API/HOOK --- 
    const { data, hasNextPage, hasPreviousPage, fetchNextPage, fetchPreviousPage, isLoading } = useUsersListHook(search);

    // flatten the paginated data
    const usersDataPage = data?.pages?.flatMap(
        (page) => page?.data?.items
    );

    return { data, search, usersDataPage, hasNextPage, hasPreviousPage, fetchNextPage, fetchPreviousPage, isLoading }
};

export default useUsersPage;