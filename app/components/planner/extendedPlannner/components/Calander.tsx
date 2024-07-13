import {
  StyleSheet,
  ScrollView,
  Dimensions,
  FlexAlignType,
  ViewStyle,
  Text,
  View,
} from 'react-native'
import React, { useMemo } from 'react'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import DayView from './DayView'
import { Loading } from '../../../../ui'
import { getRoundTimeOfLongestDay } from '../utils/getRoundTmeOfLongestDay'
import useWindowWidth from '../../../../utils/hooks/useWindowWidth'
import { getDays } from '../utils/getDays'
import useRoundData from '../hooks/useRoundData'
import Button from '../../../../ui/button/Button'
import { useMoveRound } from '../hooks/useMoveRound'
import theme from '../../../../utils/theme/theme'

const Calender = () => {
  //functions and hooks
  const { selectedDay, daysToView, moveRoundState, setMoveRoundState } =
    usePlannerContext()
  const datesToDisplay = useMemo(
    () => getDays(selectedDay, daysToView),
    [selectedDay, daysToView],
  )
  const windowWidth = useWindowWidth()
  const { roundData, getApiIsLoading } = useRoundData(datesToDisplay)
  const { moveRoundIsLoading, handleMoveRound } = useMoveRound()

  // the height of each round card is roundTime x 50 pixels
  // the plus 40 is to allow for the margin and padding
  const longestTime = useMemo(() => {
    return roundData
      ? getRoundTimeOfLongestDay(roundData) * 50 + 400
      : windowHeight
  }, [roundData])

  //variables
  const windowHeight = Dimensions.get('window').height
  const minHeight = Math.max(longestTime, 200) || 200
  const calanderWidth = datesToDisplay.length * 180
  const calenderIsBiggerThanWindow = windowWidth > calanderWidth
  const containerFlexStyle: ViewStyle = calenderIsBiggerThanWindow
    ? { alignItems: 'center' as FlexAlignType }
    : {}

  if (getApiIsLoading || moveRoundIsLoading)
    return <Loading loadingText={'Planner is Loading'} />

  return (
    <>
      {moveRoundState ? (
        <View style={{ width: windowWidth, alignItems: 'center' }}>
          <View style={[styles.moveRoundContainer]}>
            <Text style={styles.moveRoundText}>
              Select the date you wish to move your round to and click submit.
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                text="Cancel"
                backgroundColor={theme.colors.buttonSecondary}
                onPress={() => setMoveRoundState(false)}
                width={120}
              />
              <Button text="Submit" onPress={handleMoveRound} width={120} />
            </View>
          </View>
        </View>
      ) : null}

      <ScrollView
        contentContainerStyle={[
          styles.verticalScrollView,
          { minHeight: minHeight },
          containerFlexStyle,
        ]}
      >
        <ScrollView
          horizontal
          contentContainerStyle={styles.horizontalScrollView}
        >
          {/* ---------------------- maps days to display ----------------------- */}
          {roundData && !getApiIsLoading
            ? roundData.map((roundData) => {
                return (
                  <DayView
                    key={roundData.plannerDate}
                    roundData={roundData}
                    plannerDate={roundData.plannerDate}
                    minHeight={minHeight}
                  />
                )
              })
            : null}
        </ScrollView>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  verticalScrollView: {
    // height: '110%',
    marginBottom: 200,
  },
  horizontalScrollView: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  moveRoundContainer: {
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderColor: 'red',
    borderRadius: 5,
    backgroundColor: '#c4dae8',
    padding: 12,
    marginTop: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 310,
  },
  moveRoundText: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    padiingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Calender
