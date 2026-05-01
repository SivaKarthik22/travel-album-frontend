import { type AxiosInstance } from 'axios';

export class ApiService{
    protected axiosInstance: AxiosInstance;
    constructor(axiosInstance: AxiosInstance){
        this.axiosInstance = axiosInstance
    }
}