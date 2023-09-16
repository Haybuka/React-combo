import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../redux/user'

const User = () => {
  const dispatch = useDispatch()
  const { loading, error, users } = useSelector(state => state.user)


  useEffect(() => {

    dispatch(fetchUsers())
  }, [])

  return (
    <div>
      <h3>User List</h3>
      {!loading ? (
        users.map((user, id) => (
          <p key={id}>{user.name}</p>
        ))
      ) : (<p>Loading</p>)}


      <p >Update users</p>
    </div>
  )
}

export default User