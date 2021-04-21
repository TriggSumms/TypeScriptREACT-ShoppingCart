import { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import Item from './Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
// Styles
import { Wrapper, StyledButton } from './App.styles';

// Types (you have to structure out this object, as this is a strongly typed language)
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  //Added the amount prop. the rest is defined by fakeAPI
  amount: number;
};


//super EZ fake store API...
const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();


const App = () => {
  //Boolean will control the view, *defaulted 
  const [cartOpen, setCartOpen] = useState(false);
  //CartItems is an "array" type
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  //data fetch function
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );
  //console.log(data);


  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);
//Iterates through items in the cart and gives a total, accumaltor starts with int value of 0



  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      // This is the setter
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      //explicit return, and a modifier to check the cart to see if item is already in the cart, loop/compare/return:false
      if (isItemInCart) {
        return prev.map(item =>

          item.id === clickedItem.id
          // pulls items and updates the prop
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added...clickedItem updates specific item with added int
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        //explicit return...now checking the id value
        if (item.id === id) {
        // if the items amount is 1....we return the accumulater 
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } 
        //if not on the clicked item....we return the accumalated array and the item
        else {
          return [...ack, item];
        }
        //need empty array and to declare its type
      }, [] as CartItemType[])
    );
  };

  //lil error catch
  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;



  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        {/* Imported Cart component and the props */}
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      {/* Pulling some of the items we created using the Fake API and gridview with materialUI */}
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
