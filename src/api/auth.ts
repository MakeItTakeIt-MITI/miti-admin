import axiosUrl from "../utils/axios";

export const authLogin = async (data: { email: string, password: string }) => {
    try {
        const response = await axiosUrl.post('/auth/login/email', data)
        return response.data
    } catch {
        throw new Error
    }
};