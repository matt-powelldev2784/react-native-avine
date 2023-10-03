export const getRoute = async () => {
  const res = await fetch(
    `https://wps.hereapi.com/v8/findsequence2?apiKey=${process.env.HERE_API_KEY}&mode=fastest;car;traffic:disabled;motorway:-2&start=Munich;48.132777,11.565352&end=Paris;48.857397,2.346642`
  )
  console.log('res', res)
  const json = await res.json()
  console.log('json', json)

  return res
}
