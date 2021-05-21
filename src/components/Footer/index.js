import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='wrap'>
        <div className='row'>
          <div className='column'>
            <div className='title'>About Us</div>
            <Link to='/'>Story</Link>
            <Link to='/'>Clients</Link>
            <Link to='/'>Testimonials</Link>
          </div>
          <div className='column'>
            <div className='title'>Services</div>
            <Link to='/'>Story</Link>
            <Link to='/'>Clients</Link>
            <Link to='/'>Clients</Link>
            <Link to='/'>Testimonials</Link>
          </div>
          <div className='column'>
            <div className='title'>Contact Us</div>
            <Link to='/'>Story</Link>
            <Link to='/'>Clients</Link>
            <Link to='/'>Testimonials</Link>
          </div>
          <div className='column'>
            <div className='title'>Social Media</div>
            <div className='links'>
              <Link to='/' aria-label='facebook'>
                <FacebookIcon />
              </Link>
              <Link to='/' aria-label='instagram'>
                <InstagramIcon />
              </Link>
              <Link to='/' aria-label='twitter'>
                <TwitterIcon />
              </Link>
              <Link to='/' aria-label='linkedin'>
                <LinkedInIcon />
              </Link>
            </div>
            <p>© Alec Johnson - 5/2021</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
