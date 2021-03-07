import fetch from 'node-fetch';

export default async function GetTicket(data) {
  const ticket = await fetch(
    `http://127.0.0.1:8000/api/getticket?from=${data.origin}&to=${data.destination}&firstname=${data.firstName}&lastname=${data.lastName}&bus=${data.bus}&date=${data.date}`,
    {
      method: 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    }
  ).then((res) => {
    if (!res.ok) throw res;
    if (res.headers.get('content-type').includes('application/json')) return res.json();
    return res.text;
  });

  if (ticket.exception) throw ticket;
  if (ticket.to_url && ticket.from_url) return { redirect: ticket };

  return {
    ticket,
  };
}
