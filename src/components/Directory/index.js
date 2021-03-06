import React from "react";
import ShopMens from "./../../assets/mens.jpg";
import ShopWomens from "./../../assets/womens.jpg";
import "./styles.scss";

const Directory = () => {
  return (
    <div className='directory'>
      <div className='wrap'>
        <div className='item' style={{ backgroundImage: `url(${ShopWomens})` }}>
          <a href='/shop/womens'>Shop Womens</a>
        </div>
        <div className='item' style={{ backgroundImage: `url(${ShopMens})` }}>
          <a href='/shop/mens'>Shop Mens</a>
        </div>
      </div>
    </div>
  );
};

export default Directory;
