import axios, {AxiosRequestConfig} from 'axios';
import { getToken, removeToken } from '../store/authStore';

const BASE_URL = "http://localhost:9999";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
    const axiosInstance = axios.create({
        baseURL : BASE_URL,
        timeout: DEFAULT_TIMEOUT,
        headers: {
            "content-type": "application/json",
            Authorization: getToken() ? getToken() : "",
        },
        //withCredentials: true,
        ...config,
    });

    axiosInstance.interceptors.request.use((config) => {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `${token}`;
        }
        return config;
      });

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            const { response } = error;
            if (response) {
                return Promise.reject(response.data);
            }
            //token 만료 처리
            if (response.status === 401) {
                removeToken();
                window.location.href = "/login";
                return;
            }
            return Promise.reject(error);
        }
    )

    return axiosInstance;
};

export const httpClient = createClient();