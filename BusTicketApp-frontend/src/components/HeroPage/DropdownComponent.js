import React, { useContext } from 'react';
import AppContext from '../AppContext';

export default function DropdownComponent(props) {
  const context = useContext(AppContext);
  return (
    <div ref={props.reference}>
      <div className="dropdown" style={{ visibility: props.dropdownState ? 'visible' : 'hidden' }}>
        <div className="triangle"></div>
        <div className="dropdown-container">
          <div className="dropdown-wrapper">
            <div className="options-container">
              {context.values.ticketState.map((value, id) => (
                <div key={id} className="option">
                  {value.label}
                  <div className="ticket-button">
                    <button
                      className="minus-container"
                      onClick={() => props.handleRemove(id)}
                      style={{ backgroundColor: value.value < 1 ? 'white' : ' #4b01ff' }}
                    >
                      <div className="minus"></div>
                    </button>
                    <div className="counter">{value.value}</div>
                    <button className="plus-container" onClick={() => props.handleAdd(id)}>
                      <div className="plus-one">
                        <div className="plus-two"></div>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
