import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import theme from '../../../utils/theme/theme'

const PlannerRoundTicket = () => {
  return (
    <View style={styles.roundWrapper}>
      <Text>123</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  roundWrapper: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  roundContainer: {
    marginTop: 8,
    width: '100%',
    maxWidth: 700,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
  },
  roundTitleContainer: {
    padding: 8,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  roundTitleText: {
    color: theme.colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  roundIconsContainer: {
    position: 'absolute',
    top: 8,
    paddingHorizontal: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Platform.OS === 'web' ? '96%' : '100%',
    height: 40,
  },
  roundTimeText: {
    color: theme.colors.white,
    borderRaadiusBottomLeft: 20,
    borderRadiusBottomRight: 12,
    fontSize: 10,
    width: '25%',
    textAlign: 'right',
  },
  roundCardLine: {
    height: 2,
    backgroundColor: theme.colors.primary,
    width: '100%',
  },
  jobCardLine: {
    height: 1,
    backgroundColor: theme.colors.primary,
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingVertical: 20,
    paddingHorizontal: 20,
    minHeight: 82.5,
  },
})

export default PlannerRoundTicket
