import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import FormInput from "./../Forms/FormInput";
import Button from "./../Forms/Button";
import { CountryDropdown } from "react-country-region-selector";
import { apiInstance } from "./../../utils";
import { clearCart } from "./../../redux/Cart/cart.actions";
import { saveOrderHistory } from "./../../redux/Orders/orders.actions";
import {
  selectCartTotal,
  selectCartItemsCount,
  selectCartItems,
} from "./../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import "./styles.scss";
import { useHistory } from "react-router-dom";

const initialAddressState = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  country: "",
  postal_code: "",
};

const mapState = createStructuredSelector({
  total: selectCartTotal,
  itemCount: selectCartItemsCount,
  cartItems: selectCartItems,
});

const PaymentDetails = () => {
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();
  const history = useHistory();
  const { total, itemCount, cartItems } = useSelector(mapState);
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [recipientName, setRecipientName] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");

  useEffect(() => {
    if (itemCount < 1) {
      history.push("/dashboard");
    }
  }, [itemCount]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const cardElement = elements.getElement("card");

    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !shippingAddress.country ||
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.state ||
      !billingAddress.postal_code ||
      !billingAddress.country ||
      !recipientName ||
      !recipientEmail ||
      !nameOnCard
    ) {
      return;
    }

    apiInstance
      .post("/payments/create", {
        amount: total * 100,
        shipping: {
          name: recipientName,
          address: {
            ...shippingAddress,
          },
        },
      })
      .then(({ data: clientSecret }) => {
        stripe
          .createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
              name: nameOnCard,
              address: { ...billingAddress },
              email: recipientEmail,
            },
          })
          .then(({ paymentMethod }) => {
            stripe
              .confirmCardPayment(clientSecret, {
                receipt_email: recipientEmail,
                payment_method: paymentMethod.id,
              })
              .then(({ paymentIntent }) => {
                const configOrder = {
                  orderTotal: total,
                  orderItems: cartItems.map((item) => {
                    const {
                      documentID,
                      productThumbnail,
                      productName,
                      productPrice,
                      quantity,
                    } = item;
                    return {
                      documentID,
                      productThumbnail,
                      productName,
                      productPrice,
                      quantity,
                    };
                  }),
                };
                dispatch(saveOrderHistory(configOrder));
              });
          });
      });
  };

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value, //dynamically set the state for shipping input field, this saves writing out a bunch of handleChange functions for each input
    });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className='paymentDetails'>
      <form onSubmit={handleFormSubmit}>
        <div className='group'>
          <h2>Shipping Address</h2>

          <FormInput
            required
            type='text'
            name='recipientName'
            handleChange={(e) => setRecipientName(e.target.value)}
            value={recipientName}
            placeholder='Recipient Name'
          />
          <FormInput
            required
            type='text'
            name='line1'
            handleChange={(e) => handleShipping(e)}
            value={shippingAddress.line1}
            placeholder='Line 1'
          />
          <FormInput
            type='text'
            name='line2'
            handleChange={(e) => handleShipping(e)}
            value={shippingAddress.line2}
            placeholder='Line 2'
          />
          <FormInput
            required
            type='text'
            name='city'
            handleChange={(e) => handleShipping(e)}
            value={shippingAddress.city}
            placeholder='City'
          />
          <FormInput
            required
            type='text'
            name='state'
            handleChange={(e) => handleShipping(e)}
            value={shippingAddress.state}
            placeholder='State'
          />
          <FormInput
            required
            type='text'
            name='postal_code'
            handleChange={(e) => handleShipping(e)}
            value={shippingAddress.postal_code}
            placeholder='Postal Code'
          />
          {/* Uses FormInput styles */}
          <div className='formRow checkoutInput'>
            <CountryDropdown
              required
              onChange={(val) =>
                handleShipping({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              value={shippingAddress.country}
              valueType='short'
            />
          </div>
        </div>

        <div className='group'>
          <h2>Billing Address</h2>
          <FormInput
            required
            type='text'
            name='nameOnCard'
            handleChange={(e) => setNameOnCard(e.target.value)}
            value={nameOnCard}
            placeholder='Name on card'
          />
          <FormInput
            required
            type='text'
            name='line1'
            handleChange={(e) => handleBilling(e)}
            value={billingAddress.line1}
            placeholder='Line 1'
          />
          <FormInput
            type='text'
            name='line2'
            handleChange={(e) => handleBilling(e)}
            value={billingAddress.line2}
            placeholder='Line 2'
          />
          <FormInput
            required
            type='text'
            name='city'
            handleChange={(e) => handleBilling(e)}
            value={billingAddress.city}
            placeholder='City'
          />
          <FormInput
            required
            type='text'
            name='state'
            handleChange={(e) => handleBilling(e)}
            value={billingAddress.state}
            placeholder='State'
          />
          <FormInput
            required
            type='text'
            name='postal_code'
            handleChange={(e) => handleBilling(e)}
            value={billingAddress.postal_code}
            placeholder='Postal Code'
          />
          <div className='formRow checkoutInput'>
            <CountryDropdown
              required
              onChange={(val) =>
                handleBilling({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              value={billingAddress.country}
              valueType='short'
            />
          </div>
        </div>

        <div className='group'>
          <h2>Card Details</h2>
          <FormInput
            required
            type='text'
            name='recipientEmail'
            handleChange={(e) => setRecipientEmail(e.target.value)}
            value={recipientEmail}
            placeholder='Email Address'
          />
          <CardElement options={configCardElement} />
        </div>

        <Button type='submit'>Submit Payment</Button>
      </form>
    </div>
  );
};

export default PaymentDetails;
