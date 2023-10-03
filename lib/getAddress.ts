export const getAddress = async () => {
  const res = await fetch(
    `https://geocode.search.hereapi.com/v1/geocode?q=34+Diceland+Road+Banstead&apiKey=${process.env.HERE_API_KEY}`
  )
  const json = await res.json()
  console.log('get address json', json)

  return json
}
