export default function getRandomQuoteIndex() {
  const min = 0;
  const max = 10;
  const randomIndex = Math.floor(Math.random() * (max - min) + min);
  return randomIndex;
}
