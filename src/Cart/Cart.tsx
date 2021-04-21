import CartItem from '../CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';


//Pretty similar to item example
type Props = {
  //array received...
  cartItems: CartItemType[];
  //function/param/type returning nothing
  addToCart: (clickedItem: CartItemType) => void;
  //takes in the id and returns nothing...we only need the arrays item
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  //Function for total, accumulator in use...take in items/ implicit return accumulator is number paired with item props, initialized at zero
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {/* ternary as error control */}
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {/* cartItem is of type and implictily returned, needs a key as its mapped...and its props*/}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      {/* Give it the cartItems used array and then utilize your function */}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
