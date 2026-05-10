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
}