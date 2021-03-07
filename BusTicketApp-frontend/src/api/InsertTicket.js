export default async function InsertTicket(data) {
  return await fetch(
    `http://127.0.0.1:8000/api/ticket?from=${data.origin}&to=${data.destination}&firstname=${data.firstName}&lastname=${data.lastName}&bus=${data.bus}&date=${data.date}`,
    {
      method: 'POST',
      mode: 'cors',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  )
    .then((res) => res.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log('ERROR', error);
    });
}
