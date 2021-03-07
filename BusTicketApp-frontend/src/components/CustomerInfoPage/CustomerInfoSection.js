import React, { useState, useEffect, useContext, useCallback } from 'react';
import HeaderSection from '../HeaderSection';
import { useLocation, useHistory } from 'react-router-dom';
import CustomerInfoTicket from './CustomerInfoTicket';
import AppContext from '../AppContext';
import insertTicket from '../../api/InsertTicket';
import formatTime from '../Utilities/FormatTime';
import CustomerInfoHeader from './CustomerInfoHeader';
import timer from '../Toast/Timer';

export default function CustomerInfoSection() {
  const history = useHistory();
  const context = useContext(AppContext);
  const [firstNames, setFirstNames] = useState([]);
  const [lastNames, setLastNames] = useState([]);
  const [customerInfo, setCustomerInfo] = useState('customer-info-container');
  const params = useLocation().state;
  const [currentTicket, setCurrentTicket] = useState(0);
  const selectedJourneys = context.values.selectedJourneys;


  function handleChange(ticket, id) {
    setCurrentTicket(currentTicket + 1);
    [...Array(Number(id))].map((number, index) => (index > 0 ? sendTicket(ticket, index) : null));
  }

  function handleFirstNames(event) {
    const value = event.target.value;
    setFirstNames({ ...firstNames, [Number(event.target.name) + 1]: value });
  }

  function handleLastNames(event) {
    const value = event.target.value;
    setLastNames({
      ...lastNames,
      [Number(event.target.name) + 1]: value,
    });
  }

  function nameLength(state) {
    // calculate if all the inputs are filled
    let count = 0;
    [...Array(Number(params.passengers))].map((value, i) => {
      if (state[i + 1]) {
        count++;
      }
      return false;
    });
    return count === Number(params.passengers);
  }

  function toggleTicket(key) {
    if (key === currentTicket) {
      // can only toggle the current ticket
      setCustomerInfo(
        customerInfo === 'customer-info-container' ? 'customer-info-container-disabled' : 'customer-info-container'
      );
    }
  }

  const sendTicket = useCallback(
    async (ticket, id) => {
      const data = {
        origin: ticket.origin,
        destination: ticket.destination,
        firstName: firstNames[id],
        lastName: lastNames[id],
        bus: ticket.bus.numberplate,
        date: formatTime(ticket.departure),
      };

      await insertTicket(data);
    },
    [firstNames, lastNames]
  );

  useEffect(() => {
    if (currentTicket === params.journeys.length) {
      timer();
      history.replace('/review-and-confirm', {
        journeys: params.journeys,
        passengers: params.passengers,
        prices: params.prices,
        selectedJourneys,
        firstNames,
        lastNames,
      });
    }
  }, [currentTicket, history, params, selectedJourneys, firstNames, lastNames]);

  return (
    <div className="info-page-container">
      <div className="info-page-wrapper">
        <HeaderSection passengers={params.passengers} journeys={params.journeys} prices={params.prices} />
        <div className="info-header">
          <h1>Add Information</h1>
        </div>
        {params.journeys.map((journey, key) => (
          <>
            <CustomerInfoHeader journey={journey} id={key} toggleTicket={toggleTicket} passengers={params.passengers} />
            <CustomerInfoTicket
              id={key}
              journey={journey}
              currentTicket={currentTicket}
              customerInfo={customerInfo}
              ticketState={params.ticketState}
              nameLength={nameLength}
              firstNames={firstNames}
              lastNames={lastNames}
              handleChange={handleChange}
              handleLastNames={handleLastNames}
              handleFirstNames={handleFirstNames}
            />
          </>
        ))}
      </div>
    </div>
  );
}
