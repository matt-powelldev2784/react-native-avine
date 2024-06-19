import { StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { useMemo } from 'react'
import { getWeeks } from '../utils/getWeeks'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import DayView from './DayView'
import useGetApiData from '../../../../utils/hooks/useGetApiData'
import { getRoundsByPlannerDates } from '../../../../db/planner/getRoundsByPlannerDate/getRoundsByPlannerDates'
import { formatDateForDb } from '../../../../utils/formatDateForDb'
import { Loading } from '../../../../ui'
import { getRoundTimeOfLongestDay } from '../utils/getRoundTmeOfLongestDay'

const Calender = () => {
  //functions and hooks
  const { displayWeek, setDisplayWeek, selectedDay, setSelectedDay } =
    usePlannerContext()
  const datesToDisplay = useMemo(() => getWeeks(displayWeek, 2), [displayWeek])
  const plannerDates = datesToDisplay.map((date) => {
    return formatDateForDb(date)
  })
  const { data: roundData, getApiIsLoading } = useGetApiData({
    apiFunction: async () => await getRoundsByPlannerDates(plannerDates),
    selectedDay,
  })

  // the height of each round card is roundTime x 50 pixels
  // the plus 30 is to allow for the margin and padding
  const longestTime = useMemo(() => {
    return roundData ? getRoundTimeOfLongestDay(roundData) * 50 + 40 : 200
  }, [roundData])

  //variable
  const windowHeight = Dimensions.get('window').height
  const minHeight = Math.max(longestTime, windowHeight - 100)

  return (
    <ScrollView
      contentContainerStyle={[
        styles.verticalScrollView,
        { minHeight: minHeight },
      ]}
    >
      {getApiIsLoading ? <Loading loadingText={'Planner is Loading'} /> : null}

      <ScrollView
        horizontal
        contentContainerStyle={styles.horizontalScrollView}
      >
        {/* ---------------------- maps days to display ----------------------- */}
        {roundData && !getApiIsLoading
          ? roundData.map((roundData) => {
              return (
                <DayView
                  key={roundData.plannerDate.toString()}
                  roundData={roundData}
                  minHeight={minHeight}
                />
              )
            })
          : null}
      </ScrollView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  verticalScrollView: {
    height: '110%',
  },
  horizontalScrollView: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
})

export default Calender
