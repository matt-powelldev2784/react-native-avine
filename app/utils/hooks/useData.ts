import { useState, useEffect } from 'react'

interface UseDataProps {
  routeFunction: () => Promise<any>
}

const useData = ({ routeFunction }: UseDataProps) => {
  const [data, setData] = useState<unknown[] | string>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await routeFunction()
        setData(response)
        setIsLoading(false)
      } catch (error: unknown) {
        setError(error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [routeFunction])

  return { data, isLoading, error }
}

export default useData
