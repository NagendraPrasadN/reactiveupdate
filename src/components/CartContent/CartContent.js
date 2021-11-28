
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import classes from './CartContent.module.css';
import CartIcon from './CartIcon';

const CartContent = (props) => {
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  return (
    <section className={classes.starting}>
      <button className={classes.button} onClick={props.onShowCart} >
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span> Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
    </section>
  )
}

export default CartContent;