import React, { memo } from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <p>
        © {new Date().getFullYear()} Shopify. No rights reserved @
        <a href="https://bineetnaidu-io.web.app">Bineet Naidu</a>
      </p>
    </div>
  );
};

export default memo(Footer);
