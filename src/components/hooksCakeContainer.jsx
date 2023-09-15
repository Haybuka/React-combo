import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyCake } from '../redux';

const HooksCakeContainer = () => {
  const numOfCakes = useSelector((state) => state.cake.numOfCakes);
  const [number, setNumber] = useState(1);
  const dispatch = useDispatch();
  return (
    <section>
      <h3>Number of cakes {numOfCakes}</h3>
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={() => dispatch(buyCake(number))}>
        Buy {number} cakes
      </button>
    </section>
  );
};

export default HooksCakeContainer;
