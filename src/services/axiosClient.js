import axios from "axios";

const client = axios.create({
    baseURL: "https://reqres.in/api"
})


client.interceptors.response.use(function (response) {
    return response.data
}, function (error) {
    return Promise.reject(error)
})

export default client