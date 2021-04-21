import Button from '@material-ui/core/Button';
// Types *Get ya type object instructions
import { CartItemType } from '../App';
// Styles
import { Wrapper } from './Item.styles';


//Typescript demands props, create a rep of the object and a handle event for creating a new list of the selected items
type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

// expecting the item defined below, Reacts Functional Components 
//seems a little repetitive...using an implicit return with the items grabbed via the Fake API
const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <h3>${item.price}</h3>
    </div>
    <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
  </Wrapper>
);

export default Item;
