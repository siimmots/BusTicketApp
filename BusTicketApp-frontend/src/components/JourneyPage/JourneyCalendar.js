import React, { useState, useContext } from 'react';
import Moment from 'react-moment';
import moment from 'moment/moment';
import JourneyCalendarDateBox from '../JourneyPage/JourneyCalendarDateBox';
import AppContext from '../AppContext';
import { formatDate } from 'react-day-picker/moment';

export default function JourneyCalendar(props) {
  Moment.globalFormat = 'ddd, DD/MM/yyyy';
  Moment.globalMoment = moment;

  const context = useContext(AppContext);
  const departDate = formatDate(context.values.searchState.departDate);
  const returnDate = formatDate(context.values.searchState.returnDate);

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  moment.updateLocale('en', {
    week: {
      dow: 1,
    },
  });

  const [week, setWeek] = useState(moment(departDate).week());

  const today = moment();
  const tomorrow = moment().add(1, 'days');

  function getDate(value) {
    if (props.directionState === 'return' && returnDate) {
      context.values.setSearchState({ ...context.values.searchState, returnDate: value._d });
    } else {
      context.values.setSearchState({ ...context.values.searchState, departDate: value._d });
    }
  }

  function handleClick(action) {
    if (action === 'previous') {
      setWeek(week - 1);
    } else if (action === 'next') {
      setWeek(week + 1);
    }
  }

  let previousWeek = 'journey-calendar-previous';
  let dateBox = 'journey-calendar-date';

  if (week !== moment().week()) {
    previousWeek += '-active';
  } else {
    dateBox += '-wide';
  }

  const highlighted = props.directionState === 'depart' ? departDate : returnDate;

  return (
    <div className="journey-calendar">
      <div className="journey-calendar-wrapper">
        <div className={previousWeek} onClick={() => handleClick('previous')}>
          <div className="journey-calendar-icon"></div>
        </div>
        <JourneyCalendarDateBox
          weekdays={weekdays}
          week={week}
          highlighted={highlighted}
          dateBox={dateBox}
          departDate={departDate}
          today={today}
          tomorrow={tomorrow}
          directionState={props.directionState}
          getDate={getDate}
        />

        <div className="journey-calendar-next" onClick={() => handleClick('next')}>
          <div className="journey-calendar-icon"></div>
        </div>
      </div>
    </div>
  );
}
