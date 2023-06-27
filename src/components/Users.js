import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import fetchAllUser from '../services/UserServices'
import ResponsivePagination from 'react-responsive-pagination';
import AddUserButton from './AddUserButton';

const Users = (props) => {

    const [page, setPage] = useState()
    const [totalPages, setTotalPages] = useState()
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            let res = await fetchAllUser(page)

            if (res && res.data) {
                setUsers(res.data)
                setPage(res.page)
                setTotalPages(1000)
            }
        }
        getUsers()
    }, [page])

    return <div className='mt-5'>
        <AddUserButton />
        <Table striped="columns" responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Avatar</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {
                    users && users.map((user) => {
                        return <tr key={user.id}>
                            <td>{user.id}</td>
                            <td><img src={user.avatar} alt={`user-${user.id}`} height='60px' /> </td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
        <ResponsivePagination current={page} total={totalPages} onPageChange={(num) => setPage(num)} />
    </div>
}

export default Users;