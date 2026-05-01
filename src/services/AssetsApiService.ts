import { ApiService } from "./ApiService";
import axios from "axios";

class AssetsApiService extends ApiService {
    constructor() {
        const axiosInstance = axios.create({
            baseURL: "/api/assets/",
            headers: {
                'Content-Type': 'application/json',
            }
        });
        super(axiosInstance);
    }

    async getLoginPageImagesList() {
        try {
            const response = await this.axiosInstance.get("/get-assetsInFolder?folderName=login_page_images");
            return response.data;
        }
        catch (error: any) {
            return error?.response?.data;
        }
    }
}

const assetsApiServiceInstance = new AssetsApiService()
export default assetsApiServiceInstance;