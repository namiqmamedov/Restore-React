import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { store } from "../store/configureStore";
import { PagenatedResponse } from "../models/pagination";
import { router } from "../main";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))

axios.defaults.baseURL = 'http://localhost:5000/api'
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    if (import.meta.env.NODE_ENV === 'development') await sleep();
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PagenatedResponse(response.data, JSON.parse(pagination));
        return response;
    }
    return response
}, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
       case 403:
            toast.error('You are not allowed to do that');
            break;
        case 500:
            router.navigate('/server-error', {state: {error: data}});
            break;
        default:
            break;
    }

    return Promise.reject(error.response);
})

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string,data: FormData) => axios.post(url,data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody),
    putForm: (url: string,data: FormData) => axios.put(url,data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody)  
}

function createFormData(item:any){
    let formData = new FormData();
    for(const key in item){
        formData.append(key, item[key])
    }
    return formData;
}

const Admin = {
    createProduct: (product: any) => requests.postForm('/product',createFormData(product)),
    updateProduct: (product: any) => requests.putForm('/product',createFormData(product)),
    deleteProduct: (id: number) => requests.del(`/product/${id}`),
}

const Product = {
    list: (params: URLSearchParams) => requests.get('product', params),
    details: (id: number) => requests.get(`/product/${id}`),
    fetchFilters: () => requests.get('/product/filters')
}

const TestErrors = {
    get400Error: () => requests.get('/buggy/bad-request'),
    get401Error: () => requests.get('/buggy/unauthorised'),
    get404Error: () => requests.get('/buggy/not-found'),
    get500Error: () => requests.get('/buggy/server-error'),
    getValidationError: () => requests.get('/buggy/validation-error')
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.del(`basket?productId=${productId}&quantity=${quantity}`)
}

const Account = {
    login: (values: any) => requests.post('/account/login', values),
    register: (values: any) => requests.post('/account/register', values),
    currentUser: () => requests.get('/account/currentUser'),
    fetchAddress: () => requests.get('/account/savedAddress')
}

const Orders = {
    list: () => requests.get('/order'),
    fetch: (id: number) => requests.get(`/order/${id}`),
    create: (values: any) => requests.post('/order', values)
}

const Payments = {
    createPaymentIntent: () => requests.post('/payment', {})
}

const agent = {
    Product,
    TestErrors,
    Basket,
    Account,
    Orders,
    Payments,
    Admin
}

export default agent;