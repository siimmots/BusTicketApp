import React from 'react';
import PassengerComponent from './PassengerComponent';

export default function CustomerInfoTicket(props) {
  let index = 1;

  return (
    <div className={props.id === props.currentTicket ? props.customerInfo : 'customer-info-container-disabled'}>
      <div className="customer-info-form-header">
        <div className="_header">Add passenger information</div>
      </div>
      <div className="customer-info-group-container">
        {props.ticketState
          .filter((ticket) => ticket.value > 0)
          .map((ticket) =>
            [...Array(Number(ticket.value))].map((id) => (
              // create an Array with the length equal to the amount of tickets each label has -> creat that amount of tickets
              <PassengerComponent
                id={id}
                index={index++}
                ticket={ticket}
                firstNames={props.firstNames}
                handleFirstNames={props.handleFirstNames}
                lastNames={props.lastNames}
                handleLastNames={props.handleLastNames}
              />
            ))
          )}
        {props.nameLength(props.firstNames) === props.nameLength(props.lastNames) ? (
          <button
            className="submit-button-active"
            type="button"
            onClick={() => props.handleChange(props.journey, index)}
          >
            Continue
          </button>
        ) : (
          <button className="submit-button" type="button">
            Fill the fields to continue
          </button>
        )}
      </div>
    </div>
  );
}
