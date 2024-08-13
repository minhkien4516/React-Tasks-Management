import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => {
  return (
    <>
      <div className="not-found">
        <img
          src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
          alt="not-found"
        />
        <button className="btn">
          <Link to="/" className="btn_link-home">
            Go Home
          </Link>
        </button>
      </div>
    </>
  );
};

export default PageNotFound;
