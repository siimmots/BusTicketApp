import { formatDate } from 'react-day-picker/moment';

export default function ChangeUrl(ticketState, searchState) {
  let defaultURL = `/journeys/?oCity=${searchState.origin}&dCity=${searchState.destination}&departDate=${formatDate(
    searchState.departDate
  )}`;

  if (searchState.returnDate) {
    defaultURL += `&returnDate=${formatDate(searchState.returnDate)}`;
  }
  ticketState.map((ticket) => {
    if (ticket.label === 'Adult' && ticket.value > 0) {
      defaultURL += `&adult-passenger=${ticket.value}`;
    } else if (ticket.label === 'Children' && ticket.value > 0) {
      defaultURL += `&child-passenger=${ticket.value}`;
    } else if (ticket.label === 'Young person' && ticket.value > 0) {
      defaultURL += `&young-passenger=${ticket.value}`;
    } else if (ticket.label === 'Eldery person' && ticket.value > 0) {
      defaultURL += `&eldery-passenger=${ticket.value}`;
    }
    return null;
  });

  return defaultURL;
}
