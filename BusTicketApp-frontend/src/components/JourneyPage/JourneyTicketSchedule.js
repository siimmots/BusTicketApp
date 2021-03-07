import React from 'react';

export default function JourneyTicketSchedule(props) {
  return (
    <div className="schedule-container">
      <h3>Schedule</h3>
      <div className="journey-legs">
        <div className="journey-leg-start">
          <div className="date-time">
            <div className="time">{props.formatTime(props.journey.departure)}</div>
            <div className="date">
              {new Intl.DateTimeFormat('eu', {
                month: '2-digit',
                day: '2-digit',
              }).format(props.journey.departure * 1000)}
            </div>
          </div>
          <div className="stop-indicator">
            <div className="stop-marker"></div>
            <div className="stop-seperator"></div>
          </div>
          <div className="station-info">
            <div className="title">{props.journey.origin}</div>
            <div className="subtitle">Bus: {props.journey.bus.numberplate}</div>
            <div className="subtitle"> Available seats: {props.journey.bus.seats}</div>
          </div>
        </div>
        <div className="journey-leg-end">
          <div className="date-time">
            <div className="time">{props.formatTime(props.journey.arrival)}</div>
            <div className="date">
              {new Intl.DateTimeFormat('eu', {
                month: '2-digit',
                day: '2-digit',
              }).format(props.journey.departure * 1000)}
            </div>
          </div>
          <div className="stop-indicator">
            <div className="stop-marker"></div>
          </div>
          <div className="station-info">
            <div className="title">{props.journey.destination}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
