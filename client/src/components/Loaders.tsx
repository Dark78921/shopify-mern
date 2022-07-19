import React from 'react';
// Statics
import './Loaders.css';
const Loaders = () => {
  return (
    <div className="loader">
      <div className="spinner-box">
        <div className="configure-border-1">
          <div className="configure-core"></div>
        </div>
        <div className="configure-border-2">
          <div className="configure-core"></div>
        </div>
      </div>
    </div>
  );
};

export default Loaders;
