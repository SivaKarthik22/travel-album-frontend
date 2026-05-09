import { type AxiosInstance } from 'axios';

export class ApiService {
    protected axiosInstance: AxiosInstance;
    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance
    }

    /* protected getRouteWithQueryParams(route: string, queryParams: Record<string, any>) {
        const queryParamsString = Object.keys(queryParams)
            .filter((key: string) => queryParams[key] !== undefined || queryParams[key] !== null || queryParams[key] !== "" || typeof queryParams[key] !== "object")
            .map((key: string) => `${key}=${queryParams[key]}`)
            .join("&");

        return queryParamsString ? `${route}?${queryParamsString}` : route;
    } */
}