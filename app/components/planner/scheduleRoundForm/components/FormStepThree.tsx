import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import WeekPlanner from '../../weekPlanner/WeekPlanner'
import theme from '../../../../utils/theme/theme'

const FormStepThree = () => {
  return (
    <>
      <View style={styles.scheduleRoundInfo}>
        <Text style={styles.scheduleRoundInfoText}>
          Select date and click &quot;Add Round To Planner&quot; button.
        </Text>
        <Text style={styles.scheduleRoundInfoText}>
          The rounds currenty booked on the date displayed will be shown below
        </Text>
      </View>

      <View style={styles.weekPlannerWrapper}>
        <WeekPlanner addFooter={false} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  scheduleRoundInfo: {
    fontSize: 15,
    color: theme.colors.primary,
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  scheduleRoundInfoText: {
    fontSize: 15,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 2,
  },
  scheduleRoundInfoTextBold: {
    fontSize: 15,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 2,
    fontWeight: 'bold',
  },
  scheduleRoundInfoTextRed: {
    fontSize: 15,
    color: 'red',
    textAlign: 'center',
    marginBottom: 2,
    fontWeight: 'bold',
  },
  weekPlannerWrapper: {
    width: '100%',
    paddingBottom: 24,
  },
})

export default FormStepThree
