import axios, { AxiosInstance } from "axios";

const baseUrl = 'https://dev.makeittakeit.kr'

const axiosUrl: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,

});

axiosUrl.interceptors.request.use((config) => {

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
}

);


axios.interceptors.response.use()

export default axiosUrl;

