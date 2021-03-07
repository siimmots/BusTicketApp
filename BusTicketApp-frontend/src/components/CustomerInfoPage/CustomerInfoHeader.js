import React from 'react';
import formatTime from '../Utilities/FormatTime';
import { useLocation } from 'react-router-dom';
import JourneyTicketSchedule from '../JourneyPage/JourneyTicketSchedule';

export default function CustomerInfoHeader(props) {
  const location = useLocation();
  const journey = props.journey;

  function renderButtons(params) {
    return (
      <>
        <div className="_price"> €{params.journeys.length > 1 ? params.prices[props.id] : params.price}</div>
        <div className="_small-icon" onClick={() => params.handleDropdown(journey, props.id)}></div>
        <div className="_delete-icon" onClick={() => params.deleteJourney(journey, props.id)}></div>{' '}
      </>
    );
  }

  function getHeader(selectedJourney) {
    if (selectedJourney.id === journey.id && props.dropdownState) {
      return 'customer-info-container-review';
    }
    return 'customer-info-container-disabled';
  }

  function renderTrip(params) {
    return journey.id === params.selectedJourney.id && params.dropdownState ? (
      <JourneyTicketSchedule journey={journey} formatTime={params.formatTime} />
    ) : null;
  }

  return (
    <div
      className={
        location.pathname === '/add-information' ? 'customer-info-container-disabled' : getHeader(props.selectedJourney)
      }
    >
      <div
        className="customer-info-header"
        onClick={location.pathname === '/add-information' ? () => props.toggleTicket(props.id) : null}
      >
        <div className="_text">
          {Number(props.id) % 2 === 0 ? <div className="_arrowicon" /> : <div className="_return_arrow" />}
          <div className="_trip">Trip #{props.id + 1}</div>
          <div className="_stops">
            {journey.origin} - {journey.destination}
          </div>
          <div className="_dates">
            {formatTime(journey.departure)} - {formatTime(journey.arrival)}
          </div>
          <div className="_passenger">{props.passengers} {props.passengers.length > 0 ? 'Passengers' : 'Passenger'}</div>
        </div>
        {location.pathname === '/add-information' ? <div className="_icon"></div> : renderButtons(props)}
      </div>
      {location.pathname === '/review-and-confirm' ? renderTrip(props) : null}
    </div>
  );
}
