import client from "./axiosClient.js"

const fetchAllUser = () => {
    return client.get(`/users`)
}

const fetchAllUserWithPage = (page = 1) => {
    return client.get(`/users?page=${page}`)
}

const addUser = (user) => {
    return client.post("/users", { name: `${user.first_name} ${user.last_name}`, job: `Informatik` })
}

const editUser = (user) => {
    return client.put(`/users/${user.id}`, { name: `${user.first_name} ${user.last_name}`, job: `Informatik` })
}

const deleteUser = (user) => {
    return client.delete(`/users/${user.id}`)
}

export { fetchAllUser, addUser, fetchAllUserWithPage, editUser, deleteUser }