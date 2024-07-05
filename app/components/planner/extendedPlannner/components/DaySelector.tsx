import {
  Text,
  Platform,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
} from 'react-native'
import React from 'react'
import { format } from 'date-fns'
import theme from '../../../../utils/theme/theme'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import { formatDateForDb } from '../../../../utils/formatDateForDb'

interface DaySelectorProps {
  day: Date
}

const DaySelector = ({ day }: DaySelectorProps) => {
  const { selectedDay, setSelectedDay, setHighlightedDay } = usePlannerContext()
  const weekDay = format(day, 'EEEEEE')
  const dateToday = day.getDate()
  const selectDate = selectedDay.getDate()

  const daySelectDate = formatDateForDb(day)
  const today = formatDateForDb(new Date())
  const isToday = daySelectDate === today

  const handleSelectday = async () => {
    setSelectedDay(day)
    setHighlightedDay(day)
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

      {isToday ? (
        <View>
          <Image
            source={require('../../../../../assets/dot_green.png')}
            style={{ width: 7, height: 7, marginVertical: 2 }}
          />
        </View>
      ) : null}
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
    height: 55,
  },
  daySelected: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    width: Platform.OS === 'web' ? 36 : 40,
    height: 55,
  },
  dayText: {
    color: theme.colors.black,
  },
  dayTextSelected: {
    color: theme.colors.formFlowSecondary,
    fontWeight: 'bold',
  },
})

export default DaySelector
