import client from "./axiosClient.js"

const fetchAllUser = () => {
    return client.get(`/users`)
}

const fetchAllUserWithPage = (page = 1) => {
    return client.get(`/users?page=${page}`)
}

const addUser = (user) => {
    return client.post("/users", { name: `${user.firstname} ${user.lastname}`, job: `Informatik` })
}

const editUser = (user) => {
    return client.put("/users", { name: `${user.firstname} ${user.lastname}`, job: `Informatik` })
}

export { fetchAllUser, addUser, fetchAllUserWithPage, editUser }