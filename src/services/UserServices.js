import client from "./axiosClient.js"

const fetchAllUser = () => {
    return client.get(`/users`)
}

const fetchAllUserWithPage = (page = 1) => {
    return client.get(`/users?page=${page}`)
}

const addUser = (user) => {
    return client.post(`${user.firstname} ${user.lastname}`, `Informatik`)
}

export { fetchAllUser, addUser, fetchAllUserWithPage }