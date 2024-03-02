import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  RefreshableScreen,
  RootStackParamList,
} from '../../screens/stackNavigator/StackNavigator'
import { RouteProp, ParamListBase } from '@react-navigation/native'

// *****************************************************************
// the setApiFunction should be called like this example:
// setApiFunction(() => async () => addJob(values))
//
// i.e you must pass a function that returns a async function which
// contains the api call and arguments if required
// this ensures typescript still can check the values passed to the function
// *****************************************************************

interface useGetDataProps<T> {
  onSuccessScreen?: RefreshableScreen
  refreshScreen?: boolean
  apiFunction: ApiFunction<T>
  route?: RouteProp<ParamListBase>
  selectedDay?: Date
}

export type ApiFunction<T> = () => Promise<T>

const useGetApiData = <T>({
  apiFunction,
  route,
  selectedDay,
}: useGetDataProps<T>) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [data, setData] = useState<T | null>(null)
  const [getApiIsLoading, setGetApiIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!apiFunction) {
          return
        }

        setGetApiIsLoading(true)
        const response = await apiFunction()

        setData(response)
        setGetApiIsLoading(false)
      } catch (error: unknown) {
        console.log('error', error)
        setGetApiIsLoading(false)
        setError(error)
        navigation.navigate('Error')
      }
    }

    fetchData()
  }, [route, selectedDay])

  return {
    data,
    getApiIsLoading,
    error,
  }
}

export default useGetApiData
