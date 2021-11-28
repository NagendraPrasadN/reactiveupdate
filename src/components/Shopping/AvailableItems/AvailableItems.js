import { useContext } from 'react';
import classes from './AvailableItems.module.css';
import ShoptemForm from './ShoptemForm';
import CartProvider from '../../../store/cart-context';

const AvailableItems = (props) => {
  const cartCtxt = useContext(CartProvider);


  const addToCartHandler = amount => {
    cartCtxt.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });
  }

  return (<li className={classes.item}>
    <div>
      <h3>{props.name}</h3>
      <div className={classes.description}>{props.description}</div>
      <div className={classes.price}>{props.price}</div>
    </div>
    <div>
      <ShoptemForm id={props.id} onAddToCart={addToCartHandler} />
    </div>
  </li>
  );
}

export default AvailableItems;