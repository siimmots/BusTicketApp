import React from 'react';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Alert() {
  function alertContainer() {
    return (
      <div className="info-container">
        <div className="alert-icon"></div>
        <div className="info-heading">Too many passengers!</div>
      </div>
    );
  }

  return toast(alertContainer(), {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: false,
    transition: Slide,
  });
}
