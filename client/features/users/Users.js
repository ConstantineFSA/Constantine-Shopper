import '../styles/Users.css'
import React, { useState, useEffect }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUsers, selectUsers } from './usersSlice'
import { deleteUser } from './usersSlice'
import Pagination from '../pagination/Pagination'
import { Button } from '@mui/material'

const Users = () => {
    const isAdmin = useSelector((state) => state.auth.me.isAdmin);
    const users = useSelector(selectUsers)
    const [deleteStatus, setDeleteStatus] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage, setUsersPerPage] = useState(9)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
        setDeleteStatus(false)
    }, [deleteStatus])

    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)


    return (
        <>
        <h1 id='users-header'>All Users</h1>
        {isAdmin ? (
        <div id='users'>
            {currentUsers.map((user) => {
                return (
                    <div key={user.id} className='user-container'>
                        <Link to={`/users/${user.id}`} className='user'>
                        <img className='user-pic' src={user.imgUrl}/>
                        <h1>{user.username}</h1>
                        <h2>{user.email}</h2>
                        <h3>{user.address}</h3>
                        </Link>
                        <Button className='delete-button' onClick={() => {
                            setDeleteStatus(true)
                            dispatch(deleteUser(user.id))
                        }}>X</Button>
                    </div>
                )
            })}
        </div>) : "Ooops. You do not have access to this page. SOWWY :'("}
        {isAdmin ? (<Pagination itemsPerPage={usersPerPage} totalItems={users.length} setCurrentPage={setCurrentPage}/>
        ) : null}
        </>
    )
}

export default Users
