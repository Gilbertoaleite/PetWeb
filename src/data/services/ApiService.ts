import axios from 'axios';

const url = process.env.BASE_API;


export const ApiService = axios.create({
    baseURL:url,
    headers: {
        'Content-Type': 'application/json'
    }
})
