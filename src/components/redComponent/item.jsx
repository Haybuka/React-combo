import { connect } from 'react-redux';
import { buyCake, buyCream } from '../../redux/index';
import { useState } from 'react';

const Item = (props) => {
  const [number, setNumber] = useState(1);
  console.log(props);
  return (
    <section>
      {/* Conditionally renders a prop value and dispatch from state based on the own prop from parent component */}
      <h3>item - {props.item}</h3>
      <button onClick={() => props.buyItem(number)}>
        Buy {number} {props.cake ? 'Cake' : 'Cream'}{' '}
      </button>
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
    </section>
  );
};

const mapStateToProps = (state, ownProps) => {
  const itemState = ownProps.cake
    ? state.cake.numOfCakes
    : state.cream.numOfCream;
  return {
    item: itemState,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const dispatchFunction = ownProps.cake
    ? (number) => dispatch(buyCake(number))
    : (number) => dispatch(buyCream(number));
  return {
    buyItem: dispatchFunction,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Item);
