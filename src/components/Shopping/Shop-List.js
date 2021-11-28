import AvailableItems from './AvailableItems/AvailableItems';
import classes from './Shop-List.module.css';

const DummyShopList = [
  {
    id: 'm1',
    name: 'Shoes',
    description: 'Finest Quality',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'T-shirts',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Shirts',
    description: 'American, Floral',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Cosmetics',
    description: 'Crazy...and Swifty...',
    price: 18.99,
  },
  {
    id: 'm5',
    name: 'Cricket Bat',
    description: 'WRF, Crack',
    price: 32.40,
  },
  {
    id: 'm6',
    name: 'Pantry Items',
    description: 'Fresh and Healthy..',
    price: 20.59,
  },
]
const ShopList = () => {
  const shopItem = DummyShopList.map((element) => {
    return <AvailableItems
      key={element.id}
      id={element.id}
      name={element.name}
      description={element.description}
      price={element.price} />
  });
  return (
    <section className={classes.items}>
      <ul>{shopItem}</ul>

    </section>
  );
}

export default ShopList;