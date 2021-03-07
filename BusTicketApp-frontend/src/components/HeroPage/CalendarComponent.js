import React, { useContext, useEffect } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import AppContext from '../AppContext';

export default function CalendarComponent(props) {
  const context = useContext(AppContext);
  const departDate = context.values.searchState.departDate;
  const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();

  const target = props.date === props.returnDate ? 'returnDate' : 'departDate';

  const FORMAT = 'ddd, DD/MM';

  useEffect(() => {
    if (props.returnDate !== '' && props.returnDate < departDate) {
      props.setField('returnDate', parseDate(departDate));
    }
  });

  return (
    <>
      <div className={props.section}>
        {props.calendarOpen || props.date
          ? props.subheading(target === 'departDate' ? 'DEPARTING DATE' : 'RETURN DATE')
          : null}

        <DayPickerInput
          inputProps={{ readOnly: true, ref: props.reference }}
          formatDate={formatDate}
          format={FORMAT}
          value={props.date}
          parseDate={parseDate}
          placeholder={!props.calendarOpen ? 'Return date' : null}
          onDayPickerShow={() => props.setCalendarOpen(true)}
          onDayPickerHide={() => props.setCalendarOpen(false)}
          onDayChange={(e) => props.setField(target, e)}
          disabledDays={{ before: today }}
          dayPickerProps={{
            firstDayOfWeek: 1,
            weekdaysShort: WEEKDAYS_SHORT,
            modifiers: {
              disabled: [
                {
                  before: today,
                },
                {
                  before: props.date === props.returnDate ? departDate : null,
                },
              ],
            },
          }}
        />
      </div>

      {/* Renders triangles */}
      {props.calendarOpen ? <div className="triangle" style={{ marginTop: '-35px' }}></div> : null}
      {props.returnDate && target === 'returnDate' && props.calendarOpen ? (
        <div className="close-button" style={{ marginTop: '-66px' }} onClick={() => props.resetDate()}></div>
      ) : null}
      {props.returnDate && target === 'returnDate' && !props.calendarOpen ? (
        <div className="close-button" onClick={() => props.resetDate()}></div>
      ) : null}
    </>
  );
}
