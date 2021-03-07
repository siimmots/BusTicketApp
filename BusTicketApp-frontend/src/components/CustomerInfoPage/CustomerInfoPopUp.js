import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../AppContext';

export default function CustomerInfoPopUp(props) {
  const history = useHistory();
  const context = useContext(AppContext);

  function emptyBasket() {
    context.values.setSelectedJourneys([]);
    history.replace('/');
  }
  return (
    <>
      <div className="ticket-info-popup">
        <div className="ticket-info-closed" onClick={() => props.handlePopUp()}>
          <div className="_arrow"></div>
          <div className="_basket">
            <div className="_icon"></div>
            <div className="_total">
              {' '}
              Total: <span>€{props.prices.reduce((result, number) => result + number)}</span>
            </div>
          </div>
        </div>
        {props.popUp ? (
          <div className={props.basket}>
            <div className="ticket-info-open-active">
              <div className="_arrow" onClick={() => props.handlePopUp()}></div>
              <div className="_content">
                <div className="_heading">
                  <div className="_icon"></div>
                  <div className="_text">Your order total</div>
                </div>
                <div className="_journey">
                  <div className="_passengers">
                    {props.journeys.length > 1 ? 'Round trip' : 'One way'}, {props.passengers} {props.passengers.length > 0 ? 'Passengers' : 'Passenger'}
                    <div className="_delete-icon" onClick={() => emptyBasket()} />
                  </div>
                  {props.journeys.map((journey, id) => (
                    <div key={id} className="_stops">
                      {journey.origin} - {journey.destination}
                      <div className="_price"> €{props.prices[id]}</div>
                    </div>
                  ))}
                </div>
                <div className="_total-price">
                  Total for all trips
                  <div className="_price"> €{props.prices.reduce((result, number) => result + number)}</div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
