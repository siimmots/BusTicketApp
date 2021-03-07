import notify from '../Toast/Notify';
import changeUrl from './ChangeUrl';

export default function SubmitSearch(
  history,
  setOriginAlertState,
  setPassengerAlertState,
  tooManyPassengers,
  passengers,
  searchState,
  ticketState
) {
  if (!searchState.origin || !searchState.destination) {
    setOriginAlertState(true);
  }
  if (passengers === 0) {
    setPassengerAlertState(true);
  }
  if (!searchState.origin || !searchState.destination || !searchState.departDate || passengers === 0) {
    return notify();
  }
  if (searchState.origin && searchState.destination && searchState.departDate && passengers > 0 && !tooManyPassengers) {
    history.push(changeUrl(ticketState, searchState));
  }
  return null;
}
