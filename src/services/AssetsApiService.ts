import { ApiService } from "./ApiService";
import axios from "axios";

class AssetsApiService extends ApiService {
    constructor() {
        const axiosInstance = axios.create({
            baseURL: "/api/assets/",
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        super(axiosInstance, true);
    }

    async getLoginPageImagesList(height:number) {
        const allResources: string[] = [];
        try {
            let cursor: string | number | null = null;
            const nestedParams: any = {
                urlOptions: {
                    // client_hints: true,
                    // sizes: "100vw",
                    transformation: [
                        // { crop: "lfill" },
                        // { width: "auto:breakpoints", crop: "limit" },
                        // { quality: "auto" },
                        // { dpr: "auto" },
                        // { fetch_format: "auto" },
                        {quality: "auto", fetch_format: "auto"},
                        {height: height},
                    ]
                }
            }
            const flatParams = this.flattenObject("", {}, nestedParams);
            do {
                if (cursor)
                    flatParams.cursor = cursor;
                const response = await this.axiosInstance.get("/getAssetsInFolder/login_page_images", { params: flatParams });
                const responseData = response.data?.responseData;
                responseData?.assets?.forEach((element: any) => {
                    if (element.transformedImage)
                        allResources.push(element.transformedImage)
                });
                cursor = responseData?.nextCursor;
            } while (cursor);
        }
        catch (error: any) {
            console.log(error);
        }
        return allResources;
    }
}

const assetsApiServiceInstance = new AssetsApiService()
export default assetsApiServiceInstance;