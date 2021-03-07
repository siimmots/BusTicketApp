import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CustomerInfoPopUp from './CustomerInfoPage/CustomerInfoPopUp';

export default function HeaderSection(props) {
  const [popUp, setPopUp] = useState(false);
  const [basket, setBasket] = useState('');
  const location = useLocation();

  let journeyStep = 'journey-step';
  let infoStep = 'journey-step';
  let journeyBar = 'line';
  let reviewStep = 'step';
  let reviewBar = 'line';

  if (location.pathname === '/journeys/') {
    journeyStep += '-active';
  } else if (location.pathname === '/add-information') {
    journeyStep += '-active-info';
    infoStep += '-active';
    journeyBar += '-active';
  } else if (location.pathname === '/review-and-confirm') {
    journeyStep += '-active-info';
    infoStep += '-active-info';
    journeyBar += '-active';
    reviewBar += '-active';
    reviewStep = 'journey-step-active';
  }

  function handlePopUp() {
    // handle basket popup with animation
    if (basket === 'ticket-info-open-active-container') {
      setBasket('ticket-info-open-disabled-container');
      delayState();
    } else {
      setBasket('ticket-info-open-active-container');
      setPopUp(true);
    }
  }

  function delayState() {
    // delay for the basket animation
    setTimeout(() => {
      setPopUp(false);
    }, 150);
  }

  return (
    <div className="page-header">
      <div className="page-header-wrapper">
        <Link to="/" className="journey-logo">BusTicketApp</Link>
        <div className="page-indicator-container">
          <div className="page-indicator-wrapper">
            <div className="page-indicator">
              <div className={journeyStep}>
                <div className="marker" />
                <div className="step-text">Search</div>
              </div>
              <div className={journeyBar}></div>
              <div className={infoStep}>
                <div className="marker" />
                <div className="step-text">Add information</div>
              </div>
              <div className={reviewBar}></div>
              <div className={reviewStep}>
                <div className="marker" />
                <div className="step-text">Review and confirm </div>
              </div>
              <div className="line"></div>
              <div className="step">
                <div className="marker" />
                <div className="step-text">Pay</div>
              </div>
            </div>
          </div>
        </div>
        <div className="button-container">
          <div className="button-wrapper">
            <div className="locale-button">
              <div className="locale-icon"></div>
            </div>
            <div className="login-button">
              <div className="login-icon"></div>
              <div className="icon-text">Login</div>
            </div>
          </div>
        </div>
        {location.pathname === '/add-information' ? (
          <CustomerInfoPopUp
            selectedJourneys={props.selectedJourneys}
            setSelectedJourneys={props.setSelectedJourneys}
            handlePopUp={handlePopUp}
            prices={props.prices}
            popUp={popUp}
            basket={basket}
            journeys={props.journeys}
            passengers={props.passengers}
          />
        ) : null}
      </div>
    </div>
  );
}
