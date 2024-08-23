// Imports
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getRefreshToken, getUser, getAccessToken } from "../components/hooks/actions";



// Axios component
const axiosService = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {"Content-Type":"application/json"},
});


// Adding request interceptor to add headers to the request
axiosService.interceptors.request.use(async (config) => {      
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
})



// Interceptor response
axiosService.interceptors.response.use(
    (res) => Promise.resolve(res),
    (err) => Promise.reject(err),
)



// Refresh logic
const refreshAuthLogic = async (failedRequest) => {
    return axios
        .post("/auth/refresh/", 
            {refresh:getRefreshToken()}, 
            {baseURL: "http://localhost:8000/api",
            headers: {Authorization: `Bearer ${getRefreshToken()}`},
        })
        .then((res) => {
            const {access} = res.data;
            failedRequest.response.config.headers["Authorization"] = "Bearer " + access;
            localStorage.setItem("auth", JSON.stringify({access, refresh:getRefreshToken(), user:getUser()}))
        })
        .catch(() => {
            localStorage.removeItem("auth");
        });
};



// Creating the authentication interceptor
createAuthRefreshInterceptor(axiosService, refreshAuthLogic)



// Custom fetcher
export function fetcher(url) {
    return axiosService
        .get(url)
        .then((res) => res.data)
};



// Export
export default axiosService;


