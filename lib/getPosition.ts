export const getPositionFromAddress = async (address: string) => {
  const addressString = address.replace(/ /g, '+')
  console.log('addressString', addressString)

  const res = await fetch(
    `https://geocode.search.hereapi.com/v1/geocode?q=${addressString}&apiKey=${process.env.HERE_API_KEY}`
  )
  const json = await res.json()
  console.log('get address json', json)

  return json
}
