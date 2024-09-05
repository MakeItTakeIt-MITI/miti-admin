import axiosUrl from "../utils/axios";

export const authLogin = async (email: string, password: string) => {
    try {
        const response = await axiosUrl.post(
            `/auth/login/email`,
            {
                email: email,
                password: password,
            }
        );

        //   if (response.status === 200) {
        //     const { access, refresh } = response.data.data.token;
        //     localStorage.setItem("accessToken", access);
        //     localStorage.setItem("refreshToken", refresh);
        //     login(response.data.data);
        //     router.push("/home");
        //   }
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
        // throw new Error();
    }
};