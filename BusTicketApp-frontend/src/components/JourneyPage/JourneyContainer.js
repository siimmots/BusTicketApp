import React, { useContext } from 'react';
import JourneyCalendar from './JourneyCalendar';
import JourneyResults from './JourneyResults';
import AppContext from '../AppContext';
import getPassengerAmount from '../Utilities/Passenger functions/GetPassengerAmount';

export default function JourneyContainer(props) {
  const query = props.query;
  const context = useContext(AppContext);

  return (
    <div className="journey-container">
      <div className="journey-header">
        <div className="journey-results-header">
          <div className="results-counter">{props.journeys.length} Results</div>
          <div className="results-sort">
            <div>Results sorted by:</div>
            <select className="custom-select">
              <option value="time">Time</option>
              <option value="price">Lowest price</option>
            </select>
            <div className="select-chevron"></div>
          </div>
        </div>
        <JourneyCalendar
          passengers={props.passengers}
          directionState={props.directionState}
          setDirectionState={props.setDirectionState}
        />
      </div>

      <div className="results-container">
        <div className="journey-results">
          {getPassengerAmount(context) > 0 ? (
            <JourneyResults
              adultPassenger={query.get('adult-passenger') ? query.get('adult-passenger') : 0}
              childPassenger={query.get('child-passenger') ? query.get('child-passenger') : 0}
              youngPassenger={query.get('young-passenger') ? query.get('young-passenger') : 0}
              elderyPassenger={query.get('eldery-passenger') ? query.get('eldery-passenger') : 0}
              totalPassengers={getPassengerAmount(context)}
              directionState={props.directionState}
              setDirectionState={props.setDirectionState}
              setJourneys={props.setJourneys}
              journeys={props.journeys}
              selectedJourneys={props.selectedJourneys}
              setSelectedJourneys={props.setSelectedJourneys}
              basketLock={props.basketLock}
              setBasketLock={props.setBasketLock}
              setAnimationDirection={props.setAnimationDirection}
            />
          ) : (
            <div className={props.resultsBanner}>
              <div className="default-result" style={{ color: 'blue' }}>
                No passengers selected.
              </div>
            </div>
          )}
          <div className={props.resultsBanner}>
            {getPassengerAmount(context) > 0 ? <div className="default-result">No results found.</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
