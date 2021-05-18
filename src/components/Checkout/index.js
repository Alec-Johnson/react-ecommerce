import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotal,
} from "./../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import "./styles.scss";
import Button from "./../Forms/Button";
import Item from "./Item";

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

const Checkout = () => {
  const history = useHistory();
  const { cartItems, total } = useSelector(mapState);

  return (
    <div className='checkout'>
      <h1>Checkout</h1>
      <div className='cart'>
        {cartItems.length > 0 ? (
          <table border='0' cellPadding='0' cellSpacing='0'>
            <tbody>
              <tr>
                <table
                  className='checkoutHeader'
                  border='0'
                  cellPadding='0'
                  cellSpacing='0'
                >
                  <tbody>
                    <tr>
                      <th>Product</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Remove</th>
                    </tr>
                  </tbody>
                </table>
              </tr>
              <tr>
                <table border='0' cellPadding='0' cellSpacing='0'>
                  <tbody>
                    {cartItems.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <Item {...item} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </tr>

              <tr>
                <table
                  align='right'
                  border='0'
                  cellPadding='10'
                  cellSpacing='0'
                >
                  <tr align='right'>
                    <td>
                      <h3>Total: ${total}</h3>
                    </td>
                  </tr>
                  <tr>
                    <table border='0' cellPadding='10' cellSpacing='0'>
                      <tbody>
                        <tr>
                          <td>
                            <Button onClick={() => history.goBack()}>
                              Continue Shopping
                            </Button>
                          </td>
                          <td>
                            <Button onClick={() => history.push("/payment")}>
                              Checkout
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </tr>
                </table>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>You have no items in the cart.</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
