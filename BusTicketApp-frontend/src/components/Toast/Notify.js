import React from 'react';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Notify() {
  function notificationContainer() {
    return (
      <div className="info-container">
        <div className="info-icon"></div>
        <div className="info-heading">Please fill in all the fields!</div>
      </div>
    );
  }

  toast.configure();

  return toast(notificationContainer(), {
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
