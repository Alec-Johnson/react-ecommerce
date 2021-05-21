import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutUserStart } from "./../../../redux/User/user.actions";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HomeIcon from "@material-ui/icons/Home";
import StoreIcon from "@material-ui/icons/Store";
import ForwardIcon from "@material-ui/icons/Forward";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const useStyles = makeStyles({
  menuBtn: {
    width: 40,
    height: 40,
  },
  menuIcon: {
    width: 25,
    height: 25,
    color: "gray",
  },
  menuText: {
    fontSize: "16px",
    lineHeight: "4rem",
    verticalAlign: "middle",
    color: "black",
    textDecoration: "none",
    textTransform: "uppercase",
    cursor: "pointer",
  },
  list: {
    width: 200,
  },
  fullList: {
    width: "auto",
  },
});

const MobileMenu = ({ currentUser, totalCartItems }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    right: false,
  });
  const anchor = "right";

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const signOut = () => {
    dispatch(signOutUserStart());
  };

  const list = (anchor) => (
    <div
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <Link to='/'>
              <HomeIcon className={classes.menuIcon} />
            </Link>
          </ListItemIcon>
          <ListItemText>
            <Link className={classes.menuText} to='/'>
              Home
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Link to='/shop'>
              <StoreIcon className={classes.menuIcon} />
            </Link>
          </ListItemIcon>
          <ListItemText>
            <Link className={classes.menuText} to='/shop'>
              Shop
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Link to='/shop'>
              <ShoppingCartIcon className={classes.menuIcon} />
            </Link>
          </ListItemIcon>
          <ListItemText>
            <Link className={classes.menuText} to='/cart'>
              My Cart ({totalCartItems})
            </Link>
          </ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        {currentUser && (
          <>
            <ListItem button>
              <ListItemIcon>
                <Link to='/dashboard'>
                  <AccountBoxIcon className={classes.menuIcon} />
                </Link>
              </ListItemIcon>
              <ListItemText>
                <Link className={classes.menuText} to='/dashboard'>
                  My Account
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <span onClick={signOut}>
                  <ExitToAppIcon className={classes.menuIcon} />
                </span>
              </ListItemIcon>
              <ListItemText>
                <span className={classes.menuText} onClick={signOut}>
                  Logout
                </span>
              </ListItemText>
            </ListItem>
          </>
        )}
        {!currentUser && (
          <>
            <ListItem button>
              <ListItemIcon>
                <Link to='/register'>
                  <AccountBoxIcon className={classes.menuIcon} />
                </Link>
              </ListItemIcon>
              <ListItemText>
                <Link className={classes.menuText} to='/register'>
                  Register
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Link to='/login'>
                  <ForwardIcon className={classes.menuIcon} />
                </Link>
              </ListItemIcon>
              <ListItemText>
                <Link className={classes.menuText} to='/login'>
                  Login
                </Link>
              </ListItemText>
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  return (
    <div className='mobileMenu'>
      <>
        <Button onClick={toggleDrawer(anchor, true)}>
          {!state.right ? (
            <MenuIcon className={classes.menuBtn} />
          ) : (
            <ExitToAppIcon className={classes.menuBtn} />
          )}
        </Button>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </>
    </div>
  );
};

export default MobileMenu;
