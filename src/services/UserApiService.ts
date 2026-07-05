import { ApiService } from "./ApiService";
import axios from "axios";

class UserApiService extends ApiService {
    constructor() {
        const axiosInstance = axios.create({
            baseURL: "/api/user/",
            headers: {
                'Content-Type': 'application/json',
            }
        });
        super(axiosInstance);
    }

    async loginUser(email: string, password: string) {
        const response = await this.axiosInstance.post("/login", { email, password });
        return response.data;
    }
}

const userApiServiceInstance = new UserApiService();
export default userApiServiceInstance;