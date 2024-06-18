import { StyleSheet, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { getWeeks } from '../utils/getWeeks'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import DayView from './DayView'

import { useFetchRoundsData } from '../hooks/useFetchRoundsData'

const Calender = () => {
  const { displayWeek, setDisplayWeek, setSelectedDay } = usePlannerContext()
  const datesToDisplay = useMemo(() => getWeeks(displayWeek, 2), [displayWeek])

  const { roundData } = useFetchRoundsData(datesToDisplay)
  console.log('roundData', roundData)

  return (
    <ScrollView contentContainerStyle={styles.verticalScrollView}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.horizontalScrollView}
      >
        {/* ---------------------- maps days to display ----------------------- */}
        {datesToDisplay.map((date) => {
          return <DayView key={date.toString()} date={date} />
        })}
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
