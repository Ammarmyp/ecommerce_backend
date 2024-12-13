import _createAddress from "./createAddress";
import _deleteAddress from "./deleteAddress";
import _listAddresses from "./listAddresses";
namespace UserAddress {
  export const createAddress = _createAddress;
  export const deleteAddress = _deleteAddress;
  export const listAddresses = _listAddresses;
}

export default UserAddress;
