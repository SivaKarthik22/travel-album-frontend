import axios, { type AxiosInstance } from 'axios';
import TravelAlbumStore from '@/store/TravelAlbumStore';
import { setAccessToken } from "@/store/UserSlice"

export class ApiService {
    protected axiosInstance: AxiosInstance;
    constructor(axiosInstance: AxiosInstance, needCommonInterceptors: boolean = false) {
        this.axiosInstance = needCommonInterceptors ?
            this.attachCommonInterceptors(axiosInstance) :
            axiosInstance;
    }

    /* protected getRouteWithQueryParams(route: string, queryParams: Record<string, any>) {
        const queryParamsString = Object.keys(queryParams)
            .filter((key: string) => queryParams[key] !== undefined || queryParams[key] !== null || queryParams[key] !== "" || typeof queryParams[key] !== "object")
            .map((key: string) => `${key}=${queryParams[key]}`)
            .join("&");

        return queryParamsString ? `${route}?${queryParamsString}` : route;
    } */

    protected flattenObject(prefix: string, flatObj: any, objToFlatten: any) {
        if (typeof objToFlatten != 'object') {
            flatObj[prefix] = objToFlatten;
        }
        else if (objToFlatten instanceof Array) {
            objToFlatten.forEach((prop, index) => {
                const updatedPrefix = prefix ? `${prefix}-${index}` : `${index}`;
                flatObj = this.flattenObject(updatedPrefix, flatObj, prop);
            });
        }
        else {
            for (const [key, value] of Object.entries(objToFlatten)) {
                const updatedPrefix = prefix ? `${prefix}-${key}` : key;
                flatObj = this.flattenObject(updatedPrefix, flatObj, value);
            }
        }
        return flatObj;
    }

    private attachCommonInterceptors(axiosInstance: AxiosInstance) {
        // 1. Common Request Interceptor
        axiosInstance.interceptors.request.use(
            (config) => {
                const state = TravelAlbumStore.getState();
                const currentAccessToken = state.user.accessToken;
                if (currentAccessToken) {
                    config.headers['Authorization'] = `Bearer ${currentAccessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // 2. Common Response Interceptor
        axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // Bypass refresh if the custom flag is set
                if (originalRequest?.skipAuthRefresh) {
                    return Promise.reject(error);
                }

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        // Note: Use standard axios here to prevent infinite interceptor loops
                        const response = await axios.post('http://localhost:3000/api/user/refresh', {}, { withCredentials: true });
                        const { accessToken } = response.data;

                        TravelAlbumStore.dispatch(setAccessToken(accessToken)); // Update your memory reference
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                        return axiosInstance(originalRequest); // Retry with the configured instance
                    } catch (refreshError) {
                        TravelAlbumStore.dispatch(setAccessToken(null));
                        window.location.href = '/login';
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );

        return axiosInstance; // Return the modified instance
    }
}