import axios, { AxiosInstance } from "axios";

const baseUrl = 'https://api.makeittakeit.kr'
// const baseUrl = 'https://dev.makeittakeit.kr'

const axiosUrl: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,

});



axiosUrl.interceptors.request.use(
    (config) => {
        const accessToken = sessionStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosUrl.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("API call failed:", error);
        return Promise.reject(error);
    }
);



export default axiosUrl;

