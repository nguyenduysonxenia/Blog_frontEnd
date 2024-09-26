import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';
import {Link} from 'react-router-dom'
function Footer(props: any) {
  return (
    <div className="footer">
      <h1 className="title-footer">Animated Social Links</h1>
      <p className="content-footer">
        Hover over the icons to see the animation
      </p>
      <div className="social_links">
        <a target="_blank" href="https://www.instagram.com/">
          <span className="fa-stack fa-lg ig combo">
            <i className="fab fa-instagram fa-stack-2x circle"></i>
            <i className="fa fa-instagram fa-stack-1x fa-inverse icon"></i>
          </span>
        </a>
        <a target="_blank" href="https://web.telegram.org/k/">
          <span className="fa-stack fa-lg fb combo">
            <i className="fab fa-telegram-plane fa-stack-2x circle"></i>
            <i className="fa fa-facebook fa-stack-1x fa-inverse icon"></i>
          </span>
        </a>
        <a target="_blank" href="https://www.youtube.com/">
          <span className="fa-stack fa-lg yt combo">
            <i className="fab fa-youtube fa-stack-2x circle"></i>
            <i className="fa fa-youtube-play fa-stack-1x fa-inverse icon"></i>
          </span>
        </a>
        <a target="_blank" href="https://www.facebook.com/">
          <span className="fa-stack fa-lg tw combo">
            <i className="fab fa-facebook fa-stack-2x circle"></i>
            <i className="fa fa-linkedin fa-stack-1x fa-inverse icon"></i>
          </span>
        </a>
      </div>
    </div>
  );
}

Footer.propTypes = {};

export default Footer;
