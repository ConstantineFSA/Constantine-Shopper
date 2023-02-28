import React, { useEffect }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUsers, fetchUsers } from './usersSlice'
//import uuid for our keys???

const Users = () => {
    const users = useSelector(selectUsers)
    console.log(users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    return (
        <div id='users-container'>
            {users.map((user) => {
                return (
                    <div>{user.username}</div>
                )
            })}
        </div>
    )
}

export default Users
