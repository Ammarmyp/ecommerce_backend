import _addItemToCart from "./addItemToCart";
import _deleteFromCart from "./deleteFromCart";
import _listItems from "./listItems";
import _changeQuantity from "./changeQuantity";

namespace CartItem {
  export const addItemToCart = _addItemToCart;
  export const deleteFromCart = _deleteFromCart;
  export const listItems = _listItems;
  export const changeQuantity = _changeQuantity;
}

export default CartItem;
