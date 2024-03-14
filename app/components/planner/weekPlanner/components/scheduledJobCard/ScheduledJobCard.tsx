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
import { Switch } from 'react-native-switch'

type ScheduledJobCardRouteProp = RouteProp<RootStackParamList, 'Planner'>

const ScheduledJobCard = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const route = useRoute<ScheduledJobCardRouteProp>()
  const { selectedDay, selectedJob } = usePlannerContext()

  const { getApiIsLoading, jobData, isComplete } = useGetJobCardData({
    route,
  })

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
      <Switch
        value={isComplete}
        onValueChange={() => formik.handleSubmit()}
        disabled={postApiIsLoading}
        activeText={'On'}
        inActiveText={'Off'}
        circleSize={30}
        barHeight={38}
        circleBorderWidth={0}
        backgroundActive={theme.colors.primary}
        backgroundInactive={'#C4C4C4'}
        circleActiveColor={'white'}
        circleInActiveColor={theme.colors.primary}
        // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
        changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
        innerCircleStyle={{}} // style for inner animated circle for what you (may) be rendering inside the circle
        outerCircleStyle={{}} // style for outer animated circle
        renderActiveText={false}
        renderInActiveText={false}
        switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
        switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
        switchWidthMultiplier={2.5} // multiplied by the `circleSize` prop to calculate total width of the Switch
        switchBorderRadius={0} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
      />

      <Text>{jobData.jobName}</Text>
      {isComplete ? (
        <Text>Job is complete</Text>
      ) : (
        <Text>Job is not complete</Text>
      )}
    </View>
  )
}

export default ScheduledJobCard
