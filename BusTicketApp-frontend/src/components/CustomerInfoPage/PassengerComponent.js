import React from 'react';

export default function PassengerComponent(props) {
  return (
    <div key={props.id} className="customer-info-group">
      <div className="_passenger">
        Passenger #{props.index} - {props.ticket.label}
      </div>
      <div className="customer-info-form">
        <form name="contactform" className="contactform">
          <div className="columns">
            <fieldset className="contact-fieldset">
              <div>
                <div className="input-heading">First name*</div>
                <input
                  className="input"
                  value={props.firstNames[props.index] || ''}
                  name={props.index - 1}
                  type="text"
                  size="30"
                  onChange={(e) => props.handleFirstNames(e)}
                />
              </div>
              <div>
                <div className="input-heading">Last name*</div>
                <input
                  className="input"
                  type="text"
                  value={props.lastNames[props.index] || ''}
                  size="30"
                  name={props.index - 1}
                  onChange={(e) => props.handleLastNames(e)}
                />
              </div>
            </fieldset>
          </div>
        </form>
      </div>
    </div>
  );
}
