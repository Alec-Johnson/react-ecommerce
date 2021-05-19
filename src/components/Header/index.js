import "./styles.scss";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemsCount } from "./../../redux/Cart/cart.selectors";
import Logo from "./../../assets/logo.png";
import MobileMenu from "./MobileMenu";

import ContactSupportOutlinedIcon from "@material-ui/icons/ContactSupportOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state),
});

const Header = () => {
  const { currentUser, totalNumCartItems } = useSelector(mapState);

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
                <Link to='/shop'>Shop</Link>
              </li>
            </ul>
          </div>

          <div className='right'>
            <ul>
              <li>
                <Link to='/cart'>
                  <IconButton aria-label='cart'>
                    <Badge badgeContent={totalNumCartItems} color='secondary'>
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Link>
              </li>
              {currentUser && (
                <>
                  <li>
                    <Link to='/dashboard'>
                      <IconButton aria-label='cart'>
                        <PersonOutlineOutlinedIcon />
                      </IconButton>
                    </Link>
                  </li>
                  <li>
                    <Link to='/contact'>
                      <IconButton>
                        <ContactSupportOutlinedIcon />
                      </IconButton>
                    </Link>
                  </li>
                </>
              )}
              {!currentUser && (
                <>
                  <li>
                    <Link to='/register'>
                      <IconButton aria-label='cart'>
                        <PersonOutlineOutlinedIcon />
                      </IconButton>
                    </Link>
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
