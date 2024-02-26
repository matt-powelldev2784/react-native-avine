import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  RefreshableScreen,
  RootStackParamList,
} from '../../screens/stackNavigator/StackNavigator'

interface useSetDataProps {
  onSuccessScreen: RefreshableScreen
  refreshScreen?: boolean
}

export type ApiFunction = () => Promise<any>

const useSetData = ({ onSuccessScreen, refreshScreen }: useSetDataProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [data, setData] = useState<unknown>([])
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

        if (refreshScreen) {
          navigation.navigate(onSuccessScreen, { refresh: true })
        }

        if (!refreshScreen) {
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

export default useSetData
