import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  RefreshableScreen,
  RootStackParamList,
} from '../../screens/stackNavigator/StackNavigator'

interface useDataProps {
  onSuccessScreen: RefreshableScreen
  refreshScreen?: boolean
}

type RouteFunction = (args: any) => Promise<any>

const useData = ({ onSuccessScreen, refreshScreen }: useDataProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [data, setData] = useState<unknown>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [routeFunction, setRouteFunction] = useState<
    RouteFunction | undefined
  >()
  const [routeArguments, setRouteArguments] = useState<unknown>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!routeFunction) {
          return
        }

        const response = await routeFunction(routeArguments)

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
  }, [routeFunction, routeArguments])

  return {
    data,
    isLoading,
    setRouteFunction,
    setRouteArguments,
  }
}

export default useData
