import { connect } from 'react-redux';
import { buyCake } from '../../redux/index';
import { useState } from 'react';

const CakeContainer = (props) => {
  const [number, setNumber] = useState(1);

  return (
    <section>
      <h3>Number of cakes {props.numOfCakes}</h3>
      <button onClick={() => props.buyCake(number)}>Buy {number} cakes</button>
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    numOfCakes: state.cake.numOfCakes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    buyCake: (number) => dispatch(buyCake(number)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CakeContainer);
// export default CakeContainer;
