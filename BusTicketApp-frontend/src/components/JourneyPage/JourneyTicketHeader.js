import React from 'react';
import getDuration from '../Utilities/CalculateRideDuration';

export default function JourneyTicketHeader(props) {
  const journey = props.journey.journey;

  return (
    <div className="journey" onClick={() => props.handleClick(props.journey, props.id)}>
      <div className="journey-left-section">
        <div className="journey-stop-section">
          <div className="journey-stop-direct">Direct</div>
        </div>
        <div className="journey-duration-section">
          <div className="journey-time">
            {props.formatTime(journey.departure)} - {props.formatTime(journey.arrival)}
          </div>
          <div className="journey-duration">({getDuration(journey.departure, journey.arrival)})</div>
        </div>
      </div>
      <div className="journey-indicators">
        <div className="time-indicator"></div>
        <div className="indicator-seperator"></div>
        <div className="location-indicator"></div>
      </div>
      <div className="journey-data"></div>

      <div className="journey-right-section">
        <div className="journey-location">
          {journey.origin} - {journey.destination}
        </div>
      </div>
      <div className="journey-price-section">
        <div className="price-header">Starting from</div>
        <div className="price-container">€{props.calculatePrice(journey.price)}</div>
      </div>
      {props.journeyId === props.id ? (
        <div className="price-chevron-active"></div>
      ) : (
        <div className="price-chevron"></div>
      )}
    </div>
  );
}
