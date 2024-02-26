import { useState, useEffect } from 'react'

// *****************************************************************
// the apiFunction should passed as a prop in this format:
// async () => addJob(values))
//
// i.e you must pass a function that returns a async function which
// contains the api call and arguments if required
// this ensures typescript still can check the values passed to the function
// *****************************************************************

export type ApiFunction = () => Promise<any>

interface useGetDataProps {
  apiFunction: ApiFunction
}

const useGetData = ({ apiFunction }: useGetDataProps) => {
  const [data, setData] = useState<unknown>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!apiFunction) {
          return
        }

        setIsLoading(true)

        const response = await apiFunction()

        setData(response)
        setIsLoading(false)
      } catch (error: unknown) {
        console.log('error', error)
        setIsLoading(false)
        setError(error)
      }
    }

    fetchData()
  }, [apiFunction])

  return {
    data,
    isLoading,
    error,
  }
}

export default useGetData
