export default function GetPassengerAmount(context) {
  let result = 0;

  result += context.values.adultPassenger;
  result += context.values.childPassenger;
  result += context.values.youngPassenger;
  result += context.values.elderyPassenger;

  return result;
}
