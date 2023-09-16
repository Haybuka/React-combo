import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyCream } from '../../redux/index';

const CreamContainer = () => {
  const numOfCream = useSelector((state) => state.cream.numOfCream);
  const dispatch = useDispatch();
  return (
    <section>
      <h3>Number of cream {numOfCream}</h3>
      <button onClick={() => dispatch(buyCream())}>Buy cream</button>
    </section>
  );
};

export default CreamContainer;
