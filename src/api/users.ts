import axiosUrl from "../utils/axios";

export const usersListData = async (page: number | null) => {
    try {
        const response = await axiosUrl.get('/admin/users', { params: { page } })
        return response.data
    } catch {
        throw new Error
    }
};

export const suspendUserDays = async (userId: number | null, days: { days: number | null }) => {
    try {
        const response = await axiosUrl.patch(`/admin/users/${userId}/suspend`, days)
        return response.data
    } catch (error) {
        throw new Error(`Failed to suspend user: ${error}`);

    }
}