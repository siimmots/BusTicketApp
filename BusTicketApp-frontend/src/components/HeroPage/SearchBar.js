import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Dropdown from './Dropdown';
import Calendar from './Calendar';
import StopPicker from './StopPicker';
import handleTicketAmount from '../Utilities/Passenger functions/HandleTicketAmount';
import alert from '../Toast/Alert';
import Toast from '../Toast/Toast';
import changeUrl from '../Utilities/ChangeUrl';
import AppContext from '../AppContext';
import getPassengerAmount from '../Utilities/Passenger functions/GetPassengerAmount';
import submitSearch from '../Utilities/SubmitSearch';

export default function SearchBar(data) {
  const location = useLocation();
  const history = useHistory();
  const stops = data.data;
  const journeypage = location.pathname === '/journeys/';
  const context = useContext(AppContext);
  const passengers = getPassengerAmount(context);
  const {
    adultPassenger,
    childPassenger,
    youngPassenger,
    elderyPassenger,
    setAdultPassenger,
    setChildPassenger,
    setYoungPassenger,
    setElderyPassenger,
  } = context.values;

  // State
  const { searchState, setSearchState } = context.values;
  console.log(context.values);
  const [originAlertState, setOriginAlertState] = useState(false);
  const [passengerAlertState, setPassengerAlertState] = useState(null);
  const [tooManyPassengers, setTooManyPassengers] = useState(false);

  // Ticket values in state
  const [ticketState, setTicketState] = useState([
    { label: 'Adult', value: adultPassenger },
    { label: 'Children', value: childPassenger },
    { label: 'Young person', value: youngPassenger },
    { label: 'Eldery person', value: elderyPassenger },
  ]);

  useEffect(() => {
    if (journeypage) {
      history.replace(changeUrl(context.values.ticketState, context.values.searchState));
    }
  }, [ticketState, history, journeypage, context.values.searchState, context.values.ticketState]);

  function fieldGetter(field) {
    if (searchState[field]) return searchState[field];
    return null;
  }

  function fieldSetter(field, value) {
    setSearchState({ ...searchState, [field]: value });
  }

  function handleTicketAmounts(operation, ticket) {
    handleTicketAmount(
      operation,
      ticket,
      context,
      setElderyPassenger,
      setAdultPassenger,
      setChildPassenger,
      setYoungPassenger,
      setTicketState
    );
  }

  function handlePassengerAmount(state) {
    setTooManyPassengers(state);
    if (state === true) {
      return alert();
    }
    return null;
  }

  function handleClick() {
    context.values.setSelectedJourneys([]);
    return submitSearch(
      history,
      setOriginAlertState,
      setPassengerAlertState,
      tooManyPassengers,
      passengers,
      searchState,
      context.values.ticketState
    );
  }

  return (
    <div className={journeypage ? 'journey-searchbar' : 'hero-searchbar'}>
      <div className="search-container">
        <div className="search-wrapper">
          <div className="searchbar">
            <StopPicker
              stops={stops}
              alertState={originAlertState}
              setField={fieldSetter}
              getField={fieldGetter}
              directionState={data.params.directionState}
            />
            <Calendar setField={fieldSetter} getField={fieldGetter} handleDirection={data.params.handleDirection} />
            <Dropdown
              alertState={passengerAlertState}
              amountHandler={handlePassengerAmount}
              amountState={tooManyPassengers}
              passengerAmount={passengers}
              handleTicketAmount={handleTicketAmounts}
              ticketAmount={ticketState}
              directionState={data.params.directionState}
            />

            {!journeypage ? (
              <div className="search-section">
                <button type="button" onClick={() => handleClick()} className="search-button">
                  Search
                </button>
              </div>
            ) : null}

            <Toast />
          </div>
          {!journeypage ? (
            <div className="tablet-search-section">
              <button onClick={() => handleClick()} className="search-button">
                Search
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
