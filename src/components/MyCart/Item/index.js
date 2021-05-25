import React from "react";
import { useDispatch } from "react-redux";

import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import {
  removeCartItem,
  addProduct,
  reduceCartItem,
} from "../../../redux/Cart/cart.actions";

const Item = (product) => {
  const dispatch = useDispatch();
  const { productName, productThumbnail, productPrice, quantity, documentID } =
    product;

  const handleRemoveCartItem = (documentID) => {
    dispatch(removeCartItem({ documentID }));
  };

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  const handleReduceCartItem = (product) => {
    dispatch(reduceCartItem(product));
  };

  return (
    <table className='cartItem' border='0' cellPadding='10' cellSpacing='0'>
      <tbody>
        <tr>
          <td className='productThumbnail'>
            <img src={productThumbnail} alt={productName} />
          </td>
          <td>{productName}</td>

          <td>
            <div>
              <span
                className='cartBtn'
                onClick={() => handleReduceCartItem(product)}
              >
                <RemoveCircleOutlineIcon />
              </span>
              {quantity}
              <span
                onClick={() => handleAddProduct(product)}
                className='cartBtn'
              >
                <AddCircleOutlineIcon />
              </span>
            </div>
          </td>

          <td>${productPrice}</td>
          <td align='center'>
            <span
              className='removeBtn'
              onClick={() => handleRemoveCartItem(documentID)}
            >
              <HighlightOffIcon />
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Item;
