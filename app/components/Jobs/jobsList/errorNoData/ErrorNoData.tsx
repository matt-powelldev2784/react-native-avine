import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'

const ErrorNoData = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Image
          source={require('../../../../../assets/clipboard.png')}
          style={{ width: 100, height: 135, marginBottom: 8 }}
        />

        <Text style={styles.primaryText}>No Jobs Data</Text>
        <Text style={styles.secondaryText}>
          You currenly have no jobs added to your planner. Click the add job
          button to add your first job.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddJob')}
        >
          <Image
            source={require('../../../../../assets/plus.png')}
            style={{ width: 13, height: 13 }}
          />
          <Text style={styles.buttonText}>Add Job</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  flexContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#337bae',
    marginVertical: 16,
  },
  secondaryText: {
    fontSize: 18,
    color: '#337bae',
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
    backgroundColor: '#337bae',
    borderRadius: 8,
    gap: 8,
    marginBottom: 60,
    marginTop: 16,
    width: 200,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default ErrorNoData
