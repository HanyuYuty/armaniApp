import axios from "axios"

export const host = 'http://localhost:8889';
export const baseURL = host + '/api'


const instance = axios.create({
    baseURL,
});


export default instance