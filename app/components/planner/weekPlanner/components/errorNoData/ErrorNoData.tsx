import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../../screens/stackNavigator/StackNavigator'
import theme from '../../../../../utils/theme/theme'

const ErrorNoData = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Image
          source={require('../../../../../../assets/calendar_icon_large.png')}
          style={{ width: 50, height: 50, marginBottom: 8 }}
        />

        <Text style={styles.primaryText}>No Rounds Scheduled</Text>
        <Text style={styles.secondaryText}>
          You currenly have no rounds scheduled on this date. Click the Schedule
          Round button to add a round.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ScheduleRound')}
        >
          <Image
            source={require('../../../../../../assets/plus.png')}
            style={{ width: 13, height: 13 }}
          />
          <Text style={styles.buttonText}>Schedule Round</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  flexContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 4,
  },
  primaryText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginVertical: 16,
  },
  secondaryText: {
    fontSize: 18,
    color: theme.colors.primary,
    margin: 4,
    textAlign: 'center',
    marginHorizontal: 50,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 32,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    gap: 8,
    marginBottom: 60,
    marginTop: 16,
    width: 250,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default ErrorNoData
