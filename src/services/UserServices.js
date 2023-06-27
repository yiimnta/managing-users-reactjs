import client from "./axiosClient.js"

const fetchAllUser = async (page = 1) => {
    return client.get(`/users?page=${page}`)
}


export default fetchAllUser