import { StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { getWeeks } from '../utils/getWeeks'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import DayView from './DayView'

const Calender = () => {
  const { displayWeek, setDisplayWeek, setSelectedDay } = usePlannerContext()
  const datesToDisplay = getWeeks(displayWeek, 2)
  console.log('datesToDisplay', datesToDisplay)

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
