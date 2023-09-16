import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, updateUsers } from '../redux/user'

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


      <p onClick={() => updateUsers({
        "userId": 234,
        "id": 234,
        "title": "i did this",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      })}>Update users</p>
    </div>
  )
}

export default User