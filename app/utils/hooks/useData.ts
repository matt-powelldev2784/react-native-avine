import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  RefreshableScreen,
  RootStackParamList,
} from '../../screens/stackNavigator/StackNavigator'

// *****************************************************************
// the setApiFunction should be called like this example:
// setApiFunction(() => async () => addJob(values))
//
// i.e you must pass a function that returns a async function which
// contains the api call and arguments if required
// this ensures typescript still can check the values passed to the function
// *****************************************************************

interface useDataProps {
  onSuccessScreen?: RefreshableScreen
  refreshScreen?: boolean
}

type Data = { [key: string]: unknown }

export type ApiFunction = () => Promise<any>

const useData = ({ onSuccessScreen, refreshScreen }: useDataProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [data, setData] = useState<Data>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [apiFunction, setApiFunction] = useState<ApiFunction | undefined>()

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

        if (refreshScreen && onSuccessScreen) {
          navigation.navigate(onSuccessScreen, { refresh: true })
        }

        if (!refreshScreen && onSuccessScreen) {
          navigation.navigate(onSuccessScreen)
        }
      } catch (error: unknown) {
        console.log('error', error)
        setIsLoading(false)
        navigation.navigate('Error')
      }
    }

    fetchData()
  }, [apiFunction])

  return {
    data,
    isLoading,
    setApiFunction,
  }
}

export default useData
