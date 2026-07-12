import { ApiService } from "./ApiService";
import axios, { type AxiosRequestConfig } from "axios";

class UserApiService extends ApiService {
    constructor() {
        const axiosInstance = axios.create({
            baseURL: "/api/user/",
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        super(axiosInstance, true);
    }

    async loginUser(email: string, password: string) {
        const response = await this.axiosInstance.post(
            "/login",
            { email, password },
            { skipAuthRefresh: true } as AxiosRequestConfig
        );
        return response.data;
    }
}

const userApiServiceInstance = new UserApiService();
export default userApiServiceInstance;