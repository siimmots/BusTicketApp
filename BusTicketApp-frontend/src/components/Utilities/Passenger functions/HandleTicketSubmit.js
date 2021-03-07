export default function HandleTicketSubmit(
  journey,
  setAnimationDirection,
  basketLock,
  selectedJourneys,
  setSelectedJourneys,
  setPrices,
  calculatePrice,
  setDirectionState,
  setBasketLock,
  returnDate
) {
  if (setAnimationDirection) {
    setAnimationDirection('direction-background'); // change animation direction
  }
  if (basketLock) {
    // this applies when you go back to the depart date
    setSelectedJourneys(() => [...[], journey]); // overwrite the selected journey
    setPrices(() => [...[], calculatePrice(journey.price)]);
    // remove the lock -> move back to the return journey
    setDirectionState('return');
    setBasketLock(false);
  } else if (returnDate && selectedJourneys.length < 2) {
    // if return date is also chosen
    setPrices((prevState) => [...prevState, calculatePrice(journey.price)]);
    setSelectedJourneys((prevState) => [...prevState, journey]);
  } else {
    // only depart date is chosen
    setPrices((prevState) => [...prevState, calculatePrice(journey.price)]);
    setSelectedJourneys((prevState) => [...prevState, journey]);
  }
}
