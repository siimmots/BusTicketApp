export default function formatTime(timestamp) {
  const time = timestamp * 1000; // convert timestamp to milliseconds
  return new Intl.DateTimeFormat('eu', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(time);
}
