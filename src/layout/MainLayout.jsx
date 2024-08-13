import React from 'react';
import Navbar from '../pages/Navbar/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import './MainLayout.css';

export const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="children">{children}</div>
    </>
  );
};
