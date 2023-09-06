export default function getRandomIndex(maxIndex: number) {
  const minIndex = 0

  const randomIndex =
    Math.floor(Math.random() * (maxIndex - 1 - minIndex + 1)) + minIndex

  return randomIndex
}
