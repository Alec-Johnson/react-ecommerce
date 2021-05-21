import "./styles.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItemsCount } from "./../../redux/Cart/cart.selectors";
import { signOutUserStart } from "./../../redux/User/user.actions";

import Logo from "./../../assets/logo.png";
import MobileMenu from "./MobileMenu";
import Modal from "./Modal";

import ContactSupportOutlinedIcon from "@material-ui/icons/ContactSupportOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state),
});

const Header = () => {
  const dispatch = useDispatch();
  const { currentUser, totalNumCartItems } = useSelector(mapState);
  const toggleModal = () => setHideModal(!hideModal);
  const [hideModal, setHideModal] = useState(true);
  const configModal = {
    hideModal,
    toggleModal,
  };
  const signOut = () => {
    dispatch(signOutUserStart());
  };
  return (
    <header className='header'>
      <div className='wrap'>
        <nav>
          <MobileMenu
            currentUser={currentUser}
            totalCartItems={totalNumCartItems}
          />
          <div className='logoMobile'>
            <Link to='/'>
              <img src={Logo} alt='Store logo' />
            </Link>
          </div>
          <div className='left'>
            <div className='logo'>
              <Link to='/'>
                <img src={Logo} alt='Store logo' />
              </Link>
            </div>
            <ul>
              <li>
                <Link to='/shop'>Shop</Link>
              </li>
              <li>
                <Link to='/shop/mens'>Men</Link>
              </li>
              <li>
                <Link to='/shop/womens'>Women</Link>
              </li>

              <li>
                <Link to='/shop/womens'>Sale</Link>
              </li>
              <li>
                <Link to='/shop/womens'>Collections</Link>
              </li>
            </ul>
          </div>

          <Modal {...configModal}>
            <div className='contents'>
              <ul>
                {currentUser && (
                  <>
                    <li>
                      <Link to='/dashboard'>
                        <IconButton name='my account' aria-label='my account'>
                          <PersonOutlineOutlinedIcon />
                          Account
                        </IconButton>
                      </Link>
                    </li>
                    <li>
                      <span onClick={signOut}>
                        <IconButton name='sign out' aria-label='sign out'>
                          <ExitToAppIcon />
                          Sign Out
                        </IconButton>
                      </span>
                    </li>
                  </>
                )}
                {!currentUser && (
                  <>
                    <li>
                      <Link to='/login'>
                        <IconButton name='login' aria-label='cart'>
                          <PersonOutlineOutlinedIcon />
                          Login
                        </IconButton>
                      </Link>
                    </li>
                    <li>
                      <Link to='/register'>
                        <IconButton name='register' aria-label='cart'>
                          <AccountBoxIcon />
                          Register
                        </IconButton>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </Modal>
          <div className='right'>
            <ul>
              <li>
                <Link to='/cart'>
                  <IconButton name='my cart' aria-label='my cart'>
                    <Badge badgeContent={totalNumCartItems} color='secondary'>
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Link>
              </li>

              <li>
                <Link to='/contact'>
                  <IconButton name='contact' aria-label='contact'>
                    <ContactSupportOutlinedIcon />
                  </IconButton>
                </Link>
              </li>
              <li onClick={() => toggleModal()}>
                <IconButton name='user' aria-label='user'>
                  <PersonOutlineOutlinedIcon />
                </IconButton>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

Header.defaultProps = { currentUser: null };

export default Header;
