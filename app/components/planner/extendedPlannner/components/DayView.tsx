import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { format } from 'date-fns'
import theme from '../../../../utils/theme/theme'

interface DayViewProps {
  date: Date
}

const DayView = ({ date }: DayViewProps) => {
  const day = format(date, 'dd')
  const month = format(date, 'MMMM')
  const year = format(date, 'yyyy')

  return (
    <View style={styles.dayWrapper}>
      <Text>
        {day} {month} {year}
      </Text>
    </View>
  )
}

export default DayView

const styles = StyleSheet.create({
  dayWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.primary,
    height: 600,
    width: 180,
    margin: 4,
  },
})
