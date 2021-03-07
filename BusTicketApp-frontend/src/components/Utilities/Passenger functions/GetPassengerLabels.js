export default function GetPassengerLabels(context) {
  const labels = [];
  context.values.ticketState.map((value) => {
    if (value.value > 0) {
      labels.push(value.label);
    }
    return labels;
  });

  if (labels.length > 1) {
    return 'Passengers';
  }
  return labels[0];
}
