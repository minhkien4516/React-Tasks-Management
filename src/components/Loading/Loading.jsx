import React from 'react';
import ReactLoading from 'react-loading';
import './Loading.css';
const Loading = () => {
  return (
    <>
      <div className="loading">
        <ReactLoading type="spin" color="#007bff" height={100} width={100} />
      </div>
      <div className="back-drop"></div>
    </>
  );
};

export default Loading;
