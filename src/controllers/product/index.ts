import _createProduct from "./create";
import _deleteProduct from "./delete";
import _getProductById from "./getById";
import _getProducts from "./getProducts";
import _updateProduct from "./update";

namespace Property {
  export const createProduct = _createProduct;
  export const deleteProduct = _deleteProduct;
  export const getProductById = _getProductById;
  export const getProducts = _getProducts;
  export const updateProduct = _updateProduct;
}

export default Property;
