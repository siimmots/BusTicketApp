import React, { useState, useContext, useRef } from 'react';
import CalendarComponent from './CalendarComponent';
import AppContext from '../AppContext';

export default function CalendarSection(props) {
  const [departCalendarOpen, setDepartCalendarOpen] = useState('');
  const [returnCalendarOpen, setReturnCalendarOpen] = useState('');
  const context = useContext(AppContext);
  const departDate = context.values.searchState.departDate;
  const returnDate = context.values.searchState.returnDate;
  const departRef = useRef();
  const returnRef = useRef();

  function resetDate() {
    props.setField('returnDate', '');
    props.handleDirection(); // resets journey diretion back to depart only
    context.values.setSelectedJourneys([]);
  }

  function subheading(data) {
    return <div className="run-animation">{data}</div>;
  }

  return (
    <>
      <div className="section" onClick={() => departRef.current.focus()}>
        <CalendarComponent
          reference={departRef}
          section={'depart-date-section'}
          name="departDate"
          date={departDate}
          calendarOpen={departCalendarOpen}
          subheading={subheading}
          setCalendarOpen={setDepartCalendarOpen}
          setField={props.setField}
          returnDate={returnDate}
          resetDate={resetDate}
        />
      </div>
      <div className="section" onClick={() => returnRef.current.focus()}>
        <CalendarComponent
          reference={returnRef}
          section={'return-date-section'}
          name="returnDate"
          date={returnDate}
          calendarOpen={returnCalendarOpen}
          subheading={subheading}
          setCalendarOpen={setReturnCalendarOpen}
          setField={props.setField}
          returnDate={returnDate}
          resetDate={resetDate}
        />
      </div>
    </>
  );
}
