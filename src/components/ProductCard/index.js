import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductStart,
  setProduct,
} from "./../../redux/Products/products.actions";
import { addProduct } from "./../../redux/Cart/cart.actions";
import Button from "./../Forms/Button";
import "./styles.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const mapState = (state) => ({
  product: state.productsData.product,
});

const ProductCard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productID } = useParams();
  const { product } = useSelector(mapState);

  useEffect(() => {
    dispatch(fetchProductStart(productID));

    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
  };

  const configAddToCartBtn = {
    type: "button",
  };

  const {
    productName,
    productThumbnail,
    productPrice,
    productDesc,
    productPictures,
  } = product;
  return (
    <div className='productCard'>
      <div className='hero'>
        <div className='carousel disable-scrollbar'>
          <img alt={productName} src={productThumbnail} className='slide' />
          <img
            alt={productName}
            src={productPictures?.picture1}
            className='slide'
          />
          <img
            alt={productName}
            src={productPictures?.picture2}
            className='slide'
          />
          <img
            alt={productName}
            src={productPictures?.picture3}
            className='slide'
          />
        </div>
      </div>

      <div className='productDetails'>
        <div className='goBack'>
          <Button onClick={() => history.goBack()}>
            <ArrowBackIcon />
            Back
          </Button>
        </div>
        <ul>
          <li>
            <h1>{productName}</h1>
          </li>
          <li>
            <span className='price'>${productPrice}</span>
          </li>
          <li>
            <div className='addToCart'>
              <Button
                {...configAddToCartBtn}
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </Button>
            </div>
          </li>
          <li>
            <span dangerouslySetInnerHTML={{ __html: productDesc }}></span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
