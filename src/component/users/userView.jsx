import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../reduxToolKit/features/users/userSlice';
import {
  ordered,
  restocked,
} from '../../reduxToolKit/features/cakes/cakeSlice';

const UserView = () => {
  const { loading, users, error } = useSelector((state) => state.user);
  const { numOfCakes } = useSelector((state) => state.cake);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <section>
      {loading && <p>Loading</p>}
      {loading === false && error && <p>{error}</p>}
      {users.length > 0 && <p>User loading success</p>}
      {numOfCakes}
      <p>
        <button onClick={() => dispatch(ordered())}>Order cake</button>
        <button onClick={() => dispatch(restocked(20))}>Stock cake</button>
      </p>
    </section>
  );
};

export default UserView;
