import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'
import React, { useContext, useState } from 'react'
import { PlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import theme from '../../../../utils/theme/theme'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'

const PlannerMenu = () => {
  const [menuIsExpanded, setMenuIsExpanded] = useState(false)
  const { daysToView, setDaysToView } = useContext(PlannerContext)
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const handleIncreaseDaysToView = () => {
    if (daysToView >= 35) return
    setDaysToView(daysToView + 7)
  }

  const handleDecreaseDaysToView = () => {
    if (daysToView <= 7) return
    setDaysToView(daysToView - 7)
  }

  const handleScheduleRound = () => {
    navigation.navigate('Planner', { screen: 'ScheduleRoundFormView' })
    setMenuIsExpanded((prev) => !prev)
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setMenuIsExpanded((prev) => !prev)}
      >
        <Image
          source={require('../../../../../assets/hamburger.png')}
          style={{ width: 13, height: 13 }}
        />
        <Text style={styles.buttonText}>{'Menu'}</Text>
      </TouchableOpacity>

      {menuIsExpanded ? (
        <View style={styles.menu}>
          {/* ----------------  Schedule Round ----------------------------- */}

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleScheduleRound}
          >
            <Image
              source={require('../../../../../assets/plus.png')}
              style={{ width: 13, height: 13 }}
            />
            <Text style={styles.menuItemText}>Schedule Round</Text>
          </TouchableOpacity>

          <View style={styles.line} />

          {/* ----------------   Days to view selector ----------------------------- */}
          <View style={styles.daysToViewContainer}>
            <TouchableOpacity onPress={handleDecreaseDaysToView}>
              <Image
                source={require('../../../../../assets/minus_circle_white.png')}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>

            <View style={styles.textContainer}>
              <Text style={styles.smallText}>View</Text>
              <Text style={styles.text}>{daysToView} Days</Text>
            </View>

            <TouchableOpacity onPress={handleIncreaseDaysToView}>
              <Image
                source={require('../../../../../assets/plus_circle_white.png')}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  )
}

export default PlannerMenu

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Roboto_700Bold',
  },
  menu: {
    position: 'absolute',
    top: 36,
    right: '-2.5%',
    width: 200,
    backgroundColor: theme.colors.plannerPrimary,
    zIndex: 300,
    alignItems: 'center',
    paddingBottom: 4,
  },
  daysToViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
    minWidth: 180,
    paddingVertical: 10,
    height: 50,
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
    fontFamily: 'Roboto_400Regular',
  },
  text: {
    color: 'white',
    fontSize: 16,
    lineHeight: Platform.OS === 'web' ? 12 : 0,
    fontFamily: 'Roboto_700Bold',
  },
  line: {
    width: '90%',
    height: 1,
    backgroundColor: 'white',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 10,
    height: 50,
    width: '100%',
  },
  menuItemText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
})
