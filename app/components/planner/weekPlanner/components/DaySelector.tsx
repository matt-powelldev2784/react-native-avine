import {
  Text,
  Platform,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native'
import React from 'react'
import { format } from 'date-fns'
import theme from '../../../../utils/theme/theme'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'

interface DaySelectorProps {
  day: Date
}

const DaySelector = ({ day }: DaySelectorProps) => {
  const { selectedDay, setSelectedDay } = usePlannerContext()
  const weekDay = format(day, 'EEEEEE')
  const dateToday = day.getDate()
  const selectDate = selectedDay.getDate()

  const handleSelectday = async () => {
    setSelectedDay(day)
  }

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
        source={require('../../../../../assets/dot.png')}
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
