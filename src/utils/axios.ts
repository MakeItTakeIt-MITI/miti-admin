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

const logoutUser = () => {
    localStorage.removeItem("accessToken");
    // alert("Your session has expired. Please log in again.");
    // window.location.href = "/";
};

const setLogoutTimer = () => {
    const expirationTime = Date.now() + 2 * 60 * 60 * 1000;
    localStorage.setItem("logoutExpiration", expirationTime.toString());

    setTimeout(() => {
        const storedExpiration = localStorage.getItem("logoutExpiration");
        if (storedExpiration && Date.now() > Number(storedExpiration)) {
            logoutUser();
        }
    }, 2 * 60 * 60 * 1000);
};

setLogoutTimer();

axiosUrl.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
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
        const statusCode = error.response?.data?.status_code;
        const errorCode = error.response?.data?.error_code;

        console.log(errorCode);
        console.log(statusCode);

        if (statusCode === 401) {
            logoutUser();
        }

        return Promise.reject(error);
    }
);



export default axiosUrl;

