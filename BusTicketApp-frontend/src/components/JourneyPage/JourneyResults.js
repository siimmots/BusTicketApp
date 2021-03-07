import React, { useState, useEffect, useCallback, useContext } from 'react';
import fetchJourneys from '../../api/FetchJourneys';
import { useHistory } from 'react-router-dom';
import JourneyTicket from './JourneyTicket';
import JourneyTicketHeader from './JourneyTicketHeader';
import calculateTicketPrice from '../Utilities/CalculateTicketPrice';
import { formatDate } from 'react-day-picker/moment';
import handleTicketSubmit from '../Utilities/Passenger functions/HandleTicketSubmit';
import AppContext from '../AppContext';

export default function JourneyResults(props) {
  const [panelState, setPanelState] = useState(false);
  const [journeyId, setJourneyId] = useState('');
  const journeys = props.journeys;
  const setJourneys = props.setJourneys;
  const [prices, setPrices] = useState([]);
  const history = useHistory();
  const context = useContext(AppContext);
  const ticketState = context.values.ticketState;
  const { departDate, returnDate, origin, destination } = context.values.searchState;

  function calculatePrice(price) {
    return calculateTicketPrice(
      price,
      props.childPassenger,
      props.adultPassenger,
      props.youngPassenger,
      props.elderyPassenger
    );
  }

  function formatTime(timestamp) {
    const time = timestamp * 1000; // convert timestamp to milliseconds
    return new Intl.DateTimeFormat('eu', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(time);
  }

  const getJourneys = useCallback(
    async (journeyOrigin, journeyDestination, date) => {
      const result = await fetchJourneys(journeyOrigin, journeyDestination, date);

      setJourneys(result.journeys);
    },
    [setJourneys]
  );

  useEffect(() => {
    if (props.directionState === 'depart') {
      getJourneys(origin, destination, formatDate(departDate));
    } else if (props.directionState === 'return' && returnDate) {
      getJourneys(destination, origin, formatDate(returnDate));
    }
  }, [origin, destination, departDate, returnDate, props.directionState, getJourneys]);

  function handleClick(journey, id) {
    if (journeyId === id) {
      setJourneyId('');
    } else {
      setJourneyId(id);
    }
  }

  function handleMouseHover() {
    setPanelState(!panelState);
  }

  function ticketSubmit(journey) {
    return handleTicketSubmit(
      journey.journey,
      props.setAnimationDirection,
      props.basketLock,
      props.selectedJourneys,
      props.setSelectedJourneys,
      setPrices,
      calculatePrice,
      props.setDirectionState,
      props.setBasketLock,
      returnDate
    );
  }

  useEffect(() => {
    if ((props.selectedJourneys.length === 2 && returnDate) || (props.selectedJourneys.length === 1 && !returnDate)) {
      history.replace(`/add-information`, {
        journeys: props.selectedJourneys,
        ticketState,
        passengers: props.totalPassengers,
        prices,
        directionState: props.directionState,
        selectedJourneys: props.selectedJourneys,
      });
    }
  }, [props.selectedJourneys, history, prices, props.totalPassengers, props.directionState, returnDate, ticketState]);

  return (
    <div className="results-container">
      <div className="journey-results">
        {journeys.map((journey, id) => (
          <div key={id}>
            <JourneyTicketHeader
              handleClick={handleClick}
              journey={journey}
              id={id}
              formatTime={formatTime}
              calculatePrice={calculatePrice}
              journeyId={journeyId}
            />
            {journeyId === id ? (
              <JourneyTicket
                formatTime={formatTime}
                journey={journey}
                id={id}
                calculatePrice={calculatePrice}
                handleMouseHover={handleMouseHover}
                totalPassengers={props.totalPassengers}
                panelState={panelState}
                handleTicketSubmit={ticketSubmit}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
