import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { format } from 'date-fns'
import theme from '../../../../utils/theme/theme'
import { ExtendedPlannerRoundsDataT } from '../../../../types/RoundT'
import { convertDbDateToDateString } from '../../../../utils/convertDbDateToDateString'

interface DayViewProps {
  roundData: ExtendedPlannerRoundsDataT
}

const DayView = ({ roundData }: DayViewProps) => {
  const date = convertDbDateToDateString(roundData.plannerDate)
  const formattedDate = format(date, 'EEE dd MMM')
  const rounds = roundData.rounds

  console.log('rounds', rounds)

  return (
    <View style={styles.dateContiner}>
      <Text style={styles.dateText}>{formattedDate}</Text>

      <View style={styles.dayContainer}>
        {rounds.map((round) => {
          return (
            <View key={round.id} style={styles.roundContainer}>
              <Text style={styles.roundText}>{round.roundName}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default DayView

const styles = StyleSheet.create({
  dateContiner: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 4,
    borderRadius: 4,
  },
  dateText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dayContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 160,
    height: 580,
    backgroundColor: theme.colors.backgroundGrey,
    borderRadius: 4,
  },
  roundContainer: {
    width: '100%',
    marginBottom: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  roundText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    padding: 2,
  },
})
