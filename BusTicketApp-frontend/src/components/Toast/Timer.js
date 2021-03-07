import React from "react";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Timer(timeLeft) {
  function notificationContainer() {
    return (
      <div className="info-container">
        <div className="info-icon"></div>
        <div className="info-heading">Time left to purchase: {timeLeft}</div>
      </div>
    );
  }
  return toast(notificationContainer(), {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: false,
    transition: Slide,
  });
}
