import React, { useEffect, useState, useCallback } from 'react'
import Table from 'react-bootstrap/Table'
import { fetchAllUser, addUser, editUser } from '../services/UserServices'
import ResponsivePagination from 'react-responsive-pagination';
import UserModalForm from './UserModalForm';
import { Button } from 'react-bootstrap';

const Users = (props) => {

    const [page, setPage] = useState()
    const [totalPages, setTotalPages] = useState()
    const [users, setUsers] = useState([])
    const [showUsers, setShowUsers] = useState([])
    const [recordNumber, setRecordNumber] = useState(5)

    useEffect(() => {
        const getUsers = async () => {
            let res = await fetchAllUser()

            if (res && res.data) {
                setUsers(res.data)
                setTotalPages(res.total_pages)
            }
        }
        getUsers()
        setPage(1)
    }, [])

    useEffect(() => {
        const start = (page - 1) * recordNumber
        let showUsers = [...users].slice(start, start + recordNumber)
        setShowUsers(showUsers)
        setTotalPages(Math.ceil(users.length / recordNumber))
    }, [page, recordNumber, users])

    const handleAddUser = useCallback((user) => {
        addUser(user)
        user.id = users[users.length - 1].id + 1
        console.log(user)
        setUsers([...users, user])
    }, [users])

    const handleEditUser = useCallback((user) => {

        editUser(user)

        const editUsers = [...users].map((u) => {
            if (u.id === user.id) {
                u = user
            }
            return u;
        })

        setUsers(editUsers)
    }, [users])

    return <div className='mt-5'>
        <UserModalForm formName="Add New User" buttonName="Add New User" onAddUser={handleAddUser} />
        <Table striped="columns" responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Avatar</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    showUsers && showUsers.map((user) => {
                        return <tr key={user.id}>
                            <td>{user.id}</td>
                            <td><img src={user.avatar} alt={`user-${user.id}`} height='60px' /> </td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>
                                <UserModalForm formName={`Edit User (ID:${user.id})`} buttonName="Edit" editUser={user} onEditUser={handleEditUser} />
                                <Button className='mx-1 bg-base-color'>Delete</Button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
        <ResponsivePagination current={page} total={totalPages} onPageChange={(num) => setPage(num)} />
    </div>
}

export default Users;