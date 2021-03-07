import fetch from 'node-fetch';

export default async function fetchTrip(id) {
  const trip = await fetch(`http://127.0.0.1:8000/api/trip?id=${id}`, {
    method: 'GET',
    mode: 'cors',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }).then((res) => {
    if (!res.ok) throw res;
    if (res.headers.get('content-type').includes('application/json')) return res.json();
    return res.text;
  });

  if (trip.exception) throw trip;
  if (trip.to_url && trip.from_url) return { redirect: trip };

  return {
    trip,
  };
}
