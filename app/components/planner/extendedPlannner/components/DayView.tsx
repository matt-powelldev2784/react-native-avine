import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { format } from 'date-fns'
import theme from '../../../../utils/theme/theme'
import { ExtendedPlannerRoundsDataT } from '../../../../types/RoundT'
import { convertDbDateToDateString } from '../../../../utils/convertDbDateToDateString'
import RoundCard from './RoundCard'

interface DayViewProps {
  roundData: ExtendedPlannerRoundsDataT
  plannerDate: string
  minHeight: number
}

const DayView = ({ roundData, plannerDate, minHeight }: DayViewProps) => {
  const date = convertDbDateToDateString(roundData.plannerDate)
  const formattedDate = format(date, 'EEE dd MMM')
  const rounds = roundData.rounds

  return (
    <View style={styles.dateContiner}>
      <Text style={styles.dateText}>{formattedDate}</Text>

      <View style={[styles.dayContainer, { height: minHeight }]}>
        {rounds.map((round) => {
        const roundType = round.recurringRound
          ? '@oneOffRound'
          : '@recurringRound'
        const key = `${round.id}${roundType}`

        return <RoundCard key={key} round={round} plannerDate={plannerDate} />
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
    gapVertical: 4,
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
})
