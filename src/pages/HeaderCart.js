import CartContent from '../components/CartContent/CartContent';

const HomePage = (props) => {
  return <CartContent onShowCart={props.onShowCart} />;
};

export default HomePage;