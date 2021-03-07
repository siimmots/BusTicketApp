import React, { useState, useRef, useContext } from 'react';
import useOnClickOutside from '../Hooks/useOnClickOutside';
import DropdownComponent from './DropdownComponent';

import getPassengerAmount from '../Utilities/Passenger functions/GetPassengerAmount';
import AppContext from '../AppContext';
import getUsedLabels from '../Utilities/Passenger functions/GetPassengerLabels';

export default function Dropdown(props) {
  const context = useContext(AppContext);
  const ref = useRef();
  const [dropdownState, setDropdownState] = useState(false);
  const passengers = getPassengerAmount(context);

  const setTicketState = props.handleTicketAmount;
  const ticketState = props.ticketAmount;

  function getPassenger() {
    return getUsedLabels(context);
  }

  function handleAdd(id) {
    // increase specific ticket amount by 1
    setTicketState('add', context.values.ticketState[id]);

    props.amountHandler(passengers >= 9);
  }

  function handleRemove(id) {
    setTicketState('remove', context.values.ticketState[id]);

    if (passengers <= 10) {
      props.amountHandler(false);
    }
  }

  let passengersClassName = 'section';

  if (props.amountState === true || (props.alertState === true && passengers === 0)) {
    passengersClassName += '-false';
  }

  useOnClickOutside(ref, () => setDropdownState(!dropdownState));

  return (
    <div
      className={passengersClassName}
      onClick={props.directionState !== 'return' ? () => setDropdownState(true) : null}
    >
      {passengers > 0 ? (
        <div className="animation">
          <div>PASSENGERS</div>
        </div>
      ) : null}
      <div className="passengers-section">
        <div className="section-input">
          {passengers > 0 ? (
            <div className="section-input-active">
              {' '}
              {passengers} x {getPassenger()}{' '}
            </div>
          ) : (
            'Passengers'
          )}
        </div>
      </div>
      {dropdownState ? (
        <DropdownComponent
          reference={ref}
          dropdownState={dropdownState}
          ticketState={ticketState}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
        />
      ) : null}
    </div>
  );
}
