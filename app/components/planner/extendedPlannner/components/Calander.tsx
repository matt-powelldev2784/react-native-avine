import { StyleSheet, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { getWeeks } from '../utils/getWeeks'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import DayView from './DayView'
import useGetApiData from '../../../../utils/hooks/useGetApiData'
import { getRoundsByPlannerDates } from '../../../../db/planner/getRoundsByPlannerDate/getRoundsByPlannerDates'
import { formatDateForDb } from '../../../../utils/formatDateForDb'
import { Loading } from '../../../../ui'

const Calender = () => {
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

  return (
    <ScrollView contentContainerStyle={styles.verticalScrollView}>
      {getApiIsLoading ? <Loading loadingText={'Planner is Loading'} /> : null}

      <ScrollView
        horizontal
        contentContainerStyle={styles.horizontalScrollView}
      >
        {/* ---------------------- maps days to display ----------------------- */}
        {roundData
          ? roundData.map((roundData) => {
              return (
                <DayView
                  key={roundData.plannerDate.toString()}
                  roundData={roundData}
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
    minHeight: 650,
  },
  horizontalScrollView: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
})

export default Calender
