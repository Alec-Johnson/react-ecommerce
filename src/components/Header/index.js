import "./styles.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItemsCount } from "./../../redux/Cart/cart.selectors";
import { signOutUserStart } from "./../../redux/User/user.actions";
import Logo from "./../../assets/logo.png";
import Dropdown from "./Dropdown";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state),
});

const Header = () => {
  const dispatch = useDispatch();
  const { currentUser, totalNumCartItems } = useSelector(mapState);

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <header className='header'>
      <div className='wrap'>
        <nav className='nav'>
          <div className='logo'>
            <Link to='/'>
              <img src={Logo} alt='Store logo' />
            </Link>
          </div>

          <div className='middle'>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/search'>Search</Link>
              </li>
            </ul>
          </div>

          <div className='right'>
            <ul>
              <li>
                <Link to='/cart'>My Cart ({totalNumCartItems})</Link>
              </li>
              {currentUser && [
                <li>
                  <Link to='/dashboard'>ACCOUNT</Link>
                </li>,
                <li>
                  <a onClick={signOut}>LOGOUT</a>
                </li>,
              ]}
              {!currentUser && [
                <li>
                  <Link to='/register'>REGISTER</Link>
                </li>,
                <li>
                  <Link to='/login'>LOGIN</Link>
                </li>,
              ]}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

Header.defaultProps = { currentUser: null };

export default Header;
