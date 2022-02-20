import axios from "axios"

export const host = 'http://localhost:8889';
export const baseURL = host + '/api'


const instance = axios.create({
    baseURL,
});

instance.interceptors.request.use(function (config) {
    // config={url,method,data,headers,params}
    let userInfo = localStorage.getItem("userInfo");
     try {
         userInfo = JSON.parse(userInfo) || {};
     } catch (err) {
         userInfo = {};
     }
    config.headers.Authorization = userInfo.authorization
     return config;
   }, function (error) {
     // Do something with request error
     return Promise.reject(error);
   });
 

export default instance