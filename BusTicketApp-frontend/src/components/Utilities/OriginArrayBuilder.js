export default function OriginArrayBuilder(stops, allStopNames, allStopsIds) {
  const result = [];
  stops.map(
    (value) =>
      result.push(value.origin) &&
      value.stops.map((stop) => {
        allStopNames.push(stop.name);
        allStopsIds.push(stop.id);
        if (result.indexOf(stop.name) > -1) {
          return null;
        }
        result.push(stop.name);
        return null;
      })
  );
  return result;
}
