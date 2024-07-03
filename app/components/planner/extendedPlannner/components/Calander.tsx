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

  // the height of each round card is roundTime x 50 pixels
  // the plus 40 is to allow for the margin and padding
  const longestTime = useMemo(() => {
    return roundData
      ? getRoundTimeOfLongestDay(roundData) * 50 + 400
      : windowHeight
  }, [roundData])

  //variables
  const windowHeight = Dimensions.get('window').height
  const minHeight = Math.max(longestTime, windowHeight - 300) || 200
  const calanderWidth = datesToDisplay.length * 168
  const calenderIsBiggerThanWindow = windowWidth > calanderWidth
  const containerFlexStyle: ViewStyle = calenderIsBiggerThanWindow
    ? { alignItems: 'center' as FlexAlignType }
    : {}

  return (
    <>
      {moveRoundState ? (
        <View style={{ width: windowWidth, alignItems: 'center' }}>
          <View style={[styles.moveRoundContainer]}>
            <Text style={styles.moveRoundText}>
              Click the date you wish to move your round to and click submit.
            </Text>
            <Button text="Sumbit" onPress={() => setMoveRoundState(false)} />
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
        {getApiIsLoading ? (
          <Loading loadingText={'Planner is Loading'} />
        ) : null}

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
    height: '110%',
    marginBottom: 200,
  },
  horizontalScrollView: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  moveRoundContainer: {
    borderWidth: 2,
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
})

export default Calender
