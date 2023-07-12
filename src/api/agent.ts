import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = 'http://localhost:5000/api/'

const responseBody = (response: AxiosResponse) => response.data; 

axios.interceptors.response.use(async response => {
    return response
}, (error: AxiosError) => {
    const {data,status} = error.response as AxiosResponse;
    switch(status){
        case 400:
            toast.error(data);
            break;
        case 401:
            toast.error(data);
            break;
        case 500:
            toast.error(data);
            break;    
       default:
            break;

    }
    return Promise.reject(error.response); 
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url,body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url,body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Product = {
    list: () => requests.get('product'),
    details: (id: number) => requests.get(`product/${id}`)
} 

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorised'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}

const agent = {
    Product,
    TestErrors
}

export default agent;