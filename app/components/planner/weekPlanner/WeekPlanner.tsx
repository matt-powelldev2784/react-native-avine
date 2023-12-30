import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { queryRoundsOnDate } from '../../../db/planner/queryRoundsOnDate'
import { formatDateForDb } from '../../../utils/formatDateForDb'
import { RoundNoJobsT } from '../../../types/RoundT'
import WeekCalender from './components/WeekCalender'

interface WeekPlannerProps {
  onDaySelect?: (day: Date) => void
}

const WeekPlanner = ({ onDaySelect }: WeekPlannerProps) => {
  const [displayWeek, setDisplayWeek] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [roundsOnDate, setRoundsOnDate] = useState<RoundNoJobsT | []>([])

  console.log('roundsOnDate', roundsOnDate)

  useEffect(() => {
    const fetchData = async () => {
      const roundsToDisplay = (await queryRoundsOnDate(
        formatDateForDb(selectedDay),
      )) as RoundNoJobsT | []

      if (roundsToDisplay) {
        setRoundsOnDate(roundsToDisplay)
      }
    }
    fetchData()
  }, [selectedDay])

  return (
    <View style={styles.conatiner}>
      <WeekCalender
        displayWeek={displayWeek}
        setDisplayWeek={setDisplayWeek}
        setSelectedDay={setSelectedDay}
        selectedDay={selectedDay}
        onDaySelect={onDaySelect}
      />
      <View>
        <Text>Test</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  conatiner: {
    width: '100%',
  },
})

export default WeekPlanner
