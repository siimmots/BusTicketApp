import fetch from 'node-fetch';

export default async function fetchJourneys(origin, destination, date) {
  const journeys = await fetch(`http://127.0.0.1:8000/api/journeys?from=${origin}&to=${destination}&date=${date}`, {
    method: 'GET',
    mode: 'cors',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }).then((res) => {
    if (!res.ok) throw res;
    if (res.headers.get('content-type').includes('application/json')) return res.json();
    return res.text;
  });

  if (journeys.exception) throw journeys;
  if (journeys.to_url && journeys.from_url) return { redirect: journeys };

  return {
    journeys,
  };
}
