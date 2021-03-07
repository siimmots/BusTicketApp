export default function HandleTicketAmount(
  operation,
  ticket,
  context,
  setElderyPassenger,
  setAdultPassenger,
  setChildPassenger,
  setYoungPassenger,
  setTicketState
) {
  if (operation === 'add') {
    setTicketState((prevState) => ({
      // increase ticket amount
      ...prevState,
      value: ticket.value++,
    }));
    if (ticket.label === 'Adult') {
      setAdultPassenger(context.values.adultPassenger + 1);
    } else if (ticket.label === 'Children') {
      setChildPassenger(context.values.childPassenger + 1);
    } else if (ticket.label === 'Young person') {
      setYoungPassenger(context.values.youngPassenger + 1);
    } else if (ticket.label === 'Eldery person') {
      setElderyPassenger(context.values.elderyPassenger + 1);
    }
  } else if (operation === 'remove' && ticket.value > 0) {
    setTicketState((prevState) => ({
      // decrease ticket amount
      ...prevState,
      value: ticket.value--,
    }));

    if (ticket.label === 'Adult') {
      setAdultPassenger(context.values.adultPassenger - 1);
    } else if (ticket.label === 'Children') {
      setChildPassenger(context.values.childPassenger - 1);
    } else if (ticket.label === 'Young person') {
      setYoungPassenger(context.values.youngPassenger - 1);
    } else if (ticket.label === 'Eldery person') {
      setElderyPassenger(context.values.elderyPassenger - 1);
    }
  }
}
