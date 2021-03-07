import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderSection from '../components/HeaderSection';
import FetchSearchBarData from '../api/FetchSearchBarData';
import JourneyContainer from '../components/JourneyPage/JourneyContainer';
import AppContext from '../components/AppContext';

export default function JourneyPage() {
  const context = useContext(AppContext);
  const [journeys, setJourneys] = useState([]);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }


  const passengers = context.values.passengers;
  const [basketLock, setBasketLock] = useState(false);
  const selectedJourneys = context.values.selectedJourneys;
  const setSelectedJourneys = context.values.setSelectedJourneys;
  const query = useQuery();
  const directionSwitch = query.get('departDate') !== 'Invalid date' && query.get('returnDate');
  const [directionState, setDirectionState] = useState('depart');
  const returnDate = context.values.searchState.returnDate;
  const directionHeader = directionSwitch ? 'journey-direction-active' : 'journey-direction';
  const resultsBanner = journeys.length === 0 ? 'results-banner-active' : 'results-banner';
  const [animationDirection, setAnimationDirection] = useState('direction-background-unactive');

  let returnDirection = 'return-direction';
  let departDirection = 'depart-direction-active';
  if (selectedJourneys.length === 1 && !basketLock) {
    if (directionState === 'depart' && returnDate) {
      setDirectionState('return');
    }
    returnDirection += '-active';
    departDirection = 'depart-direction';
  }

  function handleDepartClick() {
    if (departDirection === 'depart-direction') {
      setAnimationDirection('direction-background-active');

      setBasketLock(true);
      setDirectionState('depart');
      returnDirection = 'return-direction';
    }
  }

  return (
    <React.Fragment>
      <title>Journeys</title>
      <div className="page-container">
        <div className="page-wrapper">
          <HeaderSection />
          <div className="journey-search-container">
            <div className="journey-search-wrapper">
              <FetchSearchBarData handleDirection={handleDepartClick} directionState={directionState} />
            </div>
          </div>
          <div className={directionHeader}>
            <div className={animationDirection}></div>
            <div className={departDirection} onClick={() => handleDepartClick()}>
              <div className="_icon"></div>
              <div className="_text">Depart</div>
            </div>
            <div className={returnDirection}>
              <div className="_rectangle"></div>
              <div className="_icon"></div>
              <div className="_text">Return</div>
            </div>
          </div>
          <JourneyContainer
            query={query}
            journeys={journeys}
            setJourneys={setJourneys}
            directionState={directionState}
            setDirectionState={setDirectionState}
            selectedJourneys={selectedJourneys}
            setSelectedJourneys={setSelectedJourneys}
            basketLock={basketLock}
            setBasketLock={setBasketLock}
            setAnimationDirection={setAnimationDirection}
            resultsBanner={resultsBanner}
            passengers={passengers}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
