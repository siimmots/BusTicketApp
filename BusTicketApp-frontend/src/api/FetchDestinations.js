import fetch from 'node-fetch';

export default async function fetchDestinations(id) {
  const stops = await fetch(`http://127.0.0.1:8000/api/stops?from=${id}`, {
    method: 'GET',
    mode: 'cors',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }).then((res) => {
    if (!res.ok) throw res;
    if (res.headers.get('content-type').includes('application/json')) return res.json();
    return res.text;
  });

  if (stops.exception) throw stops;
  if (stops.to_url && stops.from_url) return { redirect: stops };

  return {
    stops,
  };
}
