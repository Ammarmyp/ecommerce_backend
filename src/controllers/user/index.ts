import _createAddress from "./createAddress";
import _deleteAddress from "./deleteAddress";
import _listAddresses from "./listAddresses";
import _updateAddress from "./updateAddress";

namespace UserAddress {
  export const createAddress = _createAddress;
  export const deleteAddress = _deleteAddress;
  export const listAddresses = _listAddresses;
  export const updateAdress = _updateAddress;
}

export default UserAddress;
