import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import React from 'react'
import { format } from 'date-fns'
import theme from '../../../../utils/theme/theme'
import { ExtendedPlannerRoundsDataT } from '../../../../types/RoundT'
import { convertDbDateToDateString } from '../../../../utils/convertDbDateToDateString'
import RoundCard from './RoundCard'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import { formatDateForDb } from '../../../../utils/formatDateForDb'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface DayViewProps {
  roundData: ExtendedPlannerRoundsDataT
  plannerDate: string
  minHeight: number
}

const DayView = ({ roundData, plannerDate, minHeight }: DayViewProps) => {
  const { highlightedDay, setHighlightedDay, moveRoundState } =
    usePlannerContext()
  const date = convertDbDateToDateString(roundData.plannerDate)
  const formattedDate = format(date, 'EEE dd MMM')
  const rounds = roundData.rounds
  const selectedDateString = formatDateForDb(highlightedDay)

  // styles
  const highlightDateContinerStyle: ViewStyle =
    selectedDateString === plannerDate
      ? {
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: theme.colors.plannerPrimary,
          backgroundColor: '#F9E5E4',
        }
      : {}
  const highlightDayContainerStyle: ViewStyle =
    selectedDateString === plannerDate
      ? {
          backgroundColor: '#F9E5E4',
        }
      : {}
  const moveDayConatinerStyle: ViewStyle = moveRoundState
    ? {
        backgroundColor: '#c4dae8',
      }
    : {}

  //functions
  const handleDayPress = () => {
    const pressedDate = convertDbDateToDateString(plannerDate)
    setHighlightedDay(pressedDate)
  }

  return (
    <TouchableOpacity
      style={[styles.dateContiner, highlightDateContinerStyle]}
      onPress={handleDayPress}
    >
      <Text style={styles.dateText}>{formattedDate}</Text>

      <View
        style={[
          styles.dayContainer,
          { height: minHeight },
          highlightDayContainerStyle,
          moveDayConatinerStyle,
        ]}
      >
        {rounds.map((round) => {
          const roundType = round.recurringRound
            ? '@oneOffRound'
            : '@recurringRound'
          const key = `${round.id}${roundType}`

          return <RoundCard key={key} round={round} plannerDate={plannerDate} />
        })}
      </View>
    </TouchableOpacity>
  )
}

export default DayView

const styles = StyleSheet.create({
  dateContiner: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gapVertical: 4,
    borderRadius: 4,
    padding: 8,
    zIndex: 0,
  },
  dateText: {
    color: theme.colors.primary,
    fontSize: 16,
    marginBottom: 4,
    fontFamily: 'Roboto_700Bold',
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
