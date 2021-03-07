import React from 'react';
import Moment from 'react-moment';
import moment from 'moment/moment';

export default function JourneyCalendarDateBox(props) {
  return (
    <>
      {props.weekdays.map((weekday, id) => {
        if (moment(props.highlighted).isSame(moment().day(weekday).week(props.week), 'day'))
          // highlights the chosen date
          return (
            <div key={id} className={props.dateBox} style={{ background: '#cff9fc', color: 'blue' }}>
              {moment(props.today).isSame(moment().day(weekday).week(props.week), 'day') ? (
                <div className="date-banner">
                  <div>Today</div>
                </div>
              ) : null}
              {moment(props.tomorrow).isSame(moment().day(weekday).week(props.week), 'day') ? (
                <div className="tomorrow-date-banner">
                  <div>Tomorrow</div>
                </div>
              ) : null}
              <Moment>{moment().day(weekday).week(props.week)}</Moment>
            </div>
          );

        if (
          props.departDate !== 'Invalid date' &&
          props.directionState === 'return' &&
          moment().day(weekday).week(props.week).isBefore(props.departDate)
        ) {
          return (
            <div key={id} className={props.dateBox} style={{ cursor: 'default' }}>
              <Moment className="disabled-day">{moment().day(weekday).week(props.week)}</Moment>
            </div>
          );
        }
        if (
          // today
          moment(props.today).isSame(moment().day(weekday).week(props.week), 'day')
        )
          return (
            <div key={id} className={props.dateBox}>
              <div className="date-banner">
                <div>Today</div>
              </div>
              <Moment onClick={() => props.getDate(moment().day(weekday).week(props.week))}>
                {moment().day(weekday).week(props.week)}
              </Moment>
            </div>
          );
        else if (
          // tomorrow
          moment(props.tomorrow).isSame(moment().day(weekday).week(props.week), 'day')
        )
          return (
            <div key={id} className={props.dateBox}>
              <div className="tomorrow-date-banner">
                <div>Tomorrow</div>
              </div>
              <Moment onClick={() => props.getDate(moment().day(weekday).week(props.week))}>
                {moment().day(weekday).week(props.week)}
              </Moment>
            </div>
          );
        else if (moment().day(weekday).week(props.week).isBefore(props.today))
          // before today
          return (
            <div key={id} className={props.dateBox} style={{ cursor: ' default' }}>
              <Moment className="disabled-day">{moment().day(weekday).week(props.week)}</Moment>
            </div>
          );
        // tavaline
        return (
          <div key={id} className={props.dateBox}>
            <Moment onClick={() => props.getDate(moment().day(weekday).week(props.week))}>
              {moment().day(weekday).week(props.week)}
            </Moment>
          </div>
        );
      })}
    </>
  );
}
