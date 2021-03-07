import React, { useContext } from 'react';
import getUsedLabels from '../Utilities/Passenger functions/GetPassengerLabels';
import AppContext from '../AppContext';
import JourneyTicketSchedule from './JourneyTicketSchedule';

export default function JourneyTicket(props) {
  const context = useContext(AppContext);

  const journey = props.journey.journey;

  return (
    <div className="ticket-container">
      <JourneyTicketSchedule journey={journey} formatTime={props.formatTime} />
      <div className="ticket-select">
        <h3>Ticket type</h3>
        <div className="ticket">
          <div className="ticket-marker">
            <div className="ticket-marker-filling"></div>
          </div>
          <div className="ticket-type">Total Price</div>
          <div className="ticket-price">€{props.calculatePrice(journey.price)}</div>
          <div
            className="ticket-info-icon"
            onMouseEnter={() => props.handleMouseHover()}
            onMouseLeave={() => props.handleMouseHover()}
          >
            {props.panelState ? (
              <>
                {' '}
                <div className="ticket-info-panel">
                  <div className="info-panel-info">
                    <div className="ticket-info">
                      <div className="ticket-info-container">
                        Changeable
                        <div className="ticket-info-checkmark"></div>
                      </div>
                      <div className="ticket-info-container">
                        Refundable
                        <div className="ticket-info-checkmark"></div>
                      </div>
                    </div>
                    <div className="passenger-info">
                      {props.totalPassengers} x {getUsedLabels(context)}
                    </div>
                  </div>
                  <div className="info-panel-triangle"></div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <button className="confirmation-button" onClick={() => props.handleTicketSubmit(props.journey)}>
        Select and continue
      </button>
    </div>
  );
}
