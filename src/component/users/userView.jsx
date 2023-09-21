import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../reduxToolKit/features/users/userSlice';

const UserView = () => {
  const { loading, users, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <section>
      {loading && <p>Loading</p>}
      {loading === false && error && <p>{error}</p>}
      {users.length > 0 && <p>User</p>}
    </section>
  );
};

export default UserView;
