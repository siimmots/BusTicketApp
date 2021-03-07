import fetchTrip from '../../api/FetchTrip';

export default async function DestinationArrayBuilder(
  newValue,
  allStopNames,
  stops,
  fetchDestinations,
  allStopsIds
) {
  const id = allStopNames.indexOf(newValue);
  const index = [];
  const resultArray = [];

  if (id > -1) {
    const result = await fetchDestinations(allStopsIds[id]);
    resultArray.push(result.stops);
    return resultArray;
  } 
    stops.map((trip) => {
      if (trip.origin === newValue) {
        index.push(trip.id);
      }
      return null;
    });
    const result = await fetchTrip(index[0]);
    resultArray.push(result.trip);
    return resultArray;
  
}
