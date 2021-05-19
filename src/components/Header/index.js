import "./styles.scss";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItemsCount } from "./../../redux/Cart/cart.selectors";
import { signOutUserStart } from "./../../redux/User/user.actions";
import Logo from "./../../assets/logo.png";
import MobileMenu from "./MobileMenu";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HomeIcon from "@material-ui/icons/Home";
import StoreIcon from "@material-ui/icons/Store";
import ForwardIcon from "@material-ui/icons/Forward";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

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
        <nav>
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
              {currentUser && (
                <>
                  <li>
                    <Link to='/dashboard'>ACCOUNT</Link>
                  </li>
                  <li>
                    <span onClick={signOut}>LOGOUT</span>
                  </li>
                </>
              )}
              {!currentUser && (
                <>
                  <li>
                    <Link to='/register'>REGISTER</Link>
                  </li>
                  <li>
                    <Link to='/login'>LOGIN</Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <MobileMenu
            currentUser={currentUser}
            totalCartItems={totalNumCartItems}
          />
        </nav>
      </div>
    </header>
  );
};

Header.defaultProps = { currentUser: null };

export default Header;
