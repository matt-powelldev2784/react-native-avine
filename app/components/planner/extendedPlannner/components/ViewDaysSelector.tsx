import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'
import React, { useContext } from 'react'
import { PlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'

const ViewDaysSelector = () => {
  const { daysToView, setDaysToView } = useContext(PlannerContext)

  const handleIncreaseDaysToView = () => {
    if (daysToView >= 35) return
    setDaysToView(daysToView + 7)
  }

  const handleDecreaseDaysToView = () => {
    if (daysToView <= 7) return
    setDaysToView(daysToView - 7)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDecreaseDaysToView}>
        <Image
          source={require('../../../../../assets/minus_circle_white.png')}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.smallText}>View</Text>
        <Text style={styles.text}>{daysToView} Days</Text>
      </View>

      <TouchableOpacity onPress={handleIncreaseDaysToView}>
        <Image
          source={require('../../../../../assets/plus_circle_white.png')}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
    </View>
  )
}

export default ViewDaysSelector

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
    minWidth: 180,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    transform: Platform.OS === 'web' ? [{ translateY: -2.75 }] : [],
    width: 70,
  },
  smallText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: Platform.OS === 'web' ? 12 : 0,
  },
})
