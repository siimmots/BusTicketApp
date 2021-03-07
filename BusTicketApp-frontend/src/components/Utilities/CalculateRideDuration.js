import moment from 'moment/moment';
import { formatDate } from 'react-day-picker/moment';

export default function getDuration(departure, arrival) {
  const arrivalTime = new Date();
  const departureTime = new Date();

  arrivalTime.setSeconds(arrival);
  departureTime.setSeconds(departure);

  const formattedArrival = formatDate(arrivalTime, 'HH:mm');
  const formattedDeparture = formatDate(departureTime, 'HH:mm');

  const duration = moment
    .utc(moment(formattedArrival, 'HH:mm').diff(moment(formattedDeparture, 'HH :mm ')))
    .format('H[h] mm[min]');
  return duration;
}
