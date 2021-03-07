import React, { useState, useContext, useEffect } from 'react';
import HeaderSection from '../components/HeaderSection';
import { useLocation, useHistory } from 'react-router-dom';
import AppContext from '../components/AppContext';
import CustomerInfoHeader from '../components/CustomerInfoPage/CustomerInfoHeader';
import Toast from '../components/Toast/Toast';
import timer from '../components/Toast/Timer';
import moment from 'moment/moment';
// import { formatDate } from 'react-day-picker/moment';
// import Moment from 'react-moment';
// import getTicket from '../api/GetTicket';

export default function ReviewPage() {
  const location = useLocation();
  const params = location.state;
  const [dropdownState, setDropdownState] = useState(false);
  const [selectedJourney, setSelectedJourney] = useState('');
  const [price, setPrice] = useState(params.prices.reduce((result, number) => result + number));
  const context = useContext(AppContext);
  const history = useHistory();
  const [selectedJourneys, setSelectedJourneys] = useState(params.journeys);
  const now = moment();
  const ending = moment().add(45, 'minutes');
  const difference = moment.utc(moment(now, 'mm:ss').diff(moment(ending, 'mm:ss')));
  const [seconds, setSeconds] = useState(difference);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds.subtract(1, 'seconds'));
    }, 1000);
    return () => clearInterval(interval);
  });

  function formatTime(timestamp) {
    const time = timestamp * 1000; // convert timestamp to milliseconds
    return new Intl.DateTimeFormat('eu', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(time);
  }

  function handleDropdown(journey) {
    if (selectedJourney.id === journey.id) {
      return setDropdownState(!dropdownState);
    }
    setSelectedJourney(journey);
    return setDropdownState(true);
  }

  function deleteJourney(journey, id) {
    setSelectedJourney(journey);
    const index = params.selectedJourneys.indexOf(journey);
    context.values.setSelectedJourneys([params.journeys.splice(index, 1)]);
    setSelectedJourneys([params.journeys.splice(index, 1)]);
    setPrice(price - params.prices[id]);
  }

  // setInterval(() => {
  //   timer(seconds.format('mm:ss'));
  // }, 10000);
  //
  if (seconds === 0) {
    history.replace('/');
  }

  return (
    <div className="review-container">
      <div className="review-wrapper">
        <HeaderSection />
        <div className="info-header">
          <h1>Review and Confirm</h1>
        </div>
        {params.journeys.length > 0
          ? params.journeys.map((journey, id) => (
              <>
                <CustomerInfoHeader
                  id={id}
                  passengers={params.passengers}
                  journey={journey}
                  selectedJourney={selectedJourney}
                  dropdownState={dropdownState}
                  handleDropdown={handleDropdown}
                  deleteJourney={deleteJourney}
                  journeys={selectedJourneys}
                  prices={params.prices}
                  price={price}
                  formatTime={formatTime}
                />
              </>
            ))
          : history.replace('/')}
        <div className="checkout-container">
          <div className="_total">
            <h1>
              Total to pay: <span>€{price}</span>
            </h1>
          </div>
          <div className="_button" onClick={() => timer(seconds.format('mm:ss'))}>
            <span>Proceed to payment</span>
          </div>
          <Toast />
        </div>
      </div>
    </div>
  );
}
