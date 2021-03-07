export default function calculatePrice(price, childPassenger, adultPassenger, youngPassenger, elderyPassenger) {
  // calculate ticket price
  let total = 0;

  if (childPassenger > 0) {
    // children ticket = -50%
    total += price * Number(childPassenger) * 0.5;
  }
  if (adultPassenger > 0) {
    // full price for adults
    total += price * Number(adultPassenger);
  }
  if (youngPassenger > 0) {
    // young person ticket = -25%
    total += price * Number(youngPassenger) * 0.75;
  }
  if (elderyPassenger) {
    // eldery person ticket = -50%
    total += price * Number(elderyPassenger) * 0.5;
  }

  return total;
}
