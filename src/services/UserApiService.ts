import { ApiService } from "./ApiService";
import axios from "axios";

class UserApiService extends ApiService {
    constructor() {
        const axiosInstance = axios.create({
            baseURL: "/api/users/",
            headers: {
                'Content-Type': 'application/json',
            }
        });
        super(axiosInstance);
    }
}

export default new UserApiService();