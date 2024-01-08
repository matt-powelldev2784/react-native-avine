import {
  Text,
  Platform,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native'
import React, { useEffect } from 'react'
import { format } from 'date-fns'
import theme from '../../../../../utils/theme/theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { convertDbDateToPlannerDate } from '../../../../../utils/convertDbDateToPlannerDate'
import usePlannerDate from './hooks/usePlannerDate'

interface DaySelectorProps {
  selectedDay: Date
  day: Date
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>
  onDaySelect?: (day: Date) => void
}

const DaySelector = ({
  selectedDay,
  day,
  setSelectedDay,
  onDaySelect,
}: DaySelectorProps) => {
  const weekDay = format(day, 'EEEEEE')
  const dateToday = day.getDate()
  const selectDate = selectedDay.getDate()
  usePlannerDate(setSelectedDay)

  const handleSelectday = () => {
    setSelectedDay(day)
    console.log('day', day)
    onDaySelect ? onDaySelect(day) : null
  }

  useEffect(() => {
    const getPlannerDateFromStorage = async () => {
      const plannerDate = await AsyncStorage.getItem('@plannerDate')

      if (plannerDate) {
        const parsedPlannerDate = JSON.parse(plannerDate)
        const parsedDate = convertDbDateToPlannerDate(parsedPlannerDate)

        setSelectedDay(parsedDate)
        AsyncStorage.removeItem('@plannerDate')
      }
    }
    getPlannerDateFromStorage()
  })

  return (
    <TouchableOpacity
      style={dateToday === selectDate ? styles.daySelected : styles.day}
      key={day.toString()}
      onPress={handleSelectday}
    >
      <Text style={dateToday === selectDate ? styles.dayTextSelected : null}>
        {weekDay}
      </Text>

      <Text style={dateToday === selectDate ? styles.dayTextSelected : null}>
        {day.getDate()}
      </Text>

      <Image
        source={require('../../../../../../assets/dot.png')}
        style={{ width: 7, height: 7, marginVertical: 2 }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  dayWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  day: {
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    width: Platform.OS === 'web' ? 36 : 40,
  },
  daySelected: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    width: Platform.OS === 'web' ? 36 : 40,
  },
  dayTextSelected: {
    color: theme.colors.formFlowSecondary,
    fontWeight: 'bold',
  },
})

export default DaySelector
