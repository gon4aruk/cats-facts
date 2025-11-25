import { getRandomNumber } from "./getRandomNumber"

export function formatFacts(facts) {
  return facts.map(item => {
    const randomNumberForBanner = getRandomNumber(1, 8)
    const randomNumberForId = getRandomNumber(1, 10000) // it should to be sent from the API, but now it's like simple solution
    return {
      ...item,
      img: `banner_${randomNumberForBanner}`,
      id: randomNumberForId,
    }
  })
}