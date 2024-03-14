import { View, Text } from 'react-native'
import React from 'react'
import { Loading } from '../../../../../ui'
import { usePlannerContext } from '../../../../../screens/planner/plannerContext/usePlannerContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../../../screens/stackNavigator/StackNavigator'
import { useGetJobCardData } from './hooks/useGetJobCardData'
import { StackNavigationProp } from '@react-navigation/stack'
import useFormikIsComplete from './hooks/useFormikIsComplete'
import theme from '../../../../../utils/theme/theme'
import SwitchToggle from 'react-native-switch-toggle'

type ScheduledJobCardRouteProp = RouteProp<RootStackParamList, 'Planner'>

const ScheduledJobCard = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const route = useRoute<ScheduledJobCardRouteProp>()
  const { selectedDay, selectedJob } = usePlannerContext()

  const { getApiIsLoading, jobData, isComplete } = useGetJobCardData({
    route,
  })

  console.log('jobData', jobData)

  const { postApiIsLoading, formik } = useFormikIsComplete({
    isComplete,
  })

  if (!selectedJob || !selectedDay) {
    navigation.navigate('Error')
    return
  }

  if (getApiIsLoading || typeof isComplete !== 'boolean') {
    return <Loading loadingText={'Loading job details...'} />
  }

  return (
    <View>
      <Text>ScheduledJobCard</Text>

      <SwitchToggle
        switchOn={isComplete}
        onPress={() => formik.handleSubmit()}
        circleColorOff={theme.colors.primary}
        circleColorOn={'white'}
        backgroundColorOn={theme.colors.primary}
        backgroundColorOff="#C4C4C4"
      />

      {isComplete ? (
        <Text>Job is complete</Text>
      ) : (
        <Text>Job is not complete</Text>
      )}
    </View>
  )
}

export default ScheduledJobCard
