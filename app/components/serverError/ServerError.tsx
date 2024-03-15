import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../screens/stackNavigator/StackNavigator'
import theme from '../../utils/theme/theme'
import Button from '../../ui/button/Button'

const ServerError = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Image
          source={require('../../../assets/error.png')}
          style={{ width: 183, height: 166, marginBottom: 8 }}
        />

        <Text style={styles.primaryText}>
          The application has encountered an error.
        </Text>

        <Text style={styles.secondaryText}>Please try again later.</Text>

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate('Home')}
            text="Click here to go home"
          />
        </View>
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
    color: theme.colors.primary,
    marginVertical: 16,
    textAlign: 'center',
  },
  secondaryText: {
    fontSize: 18,
    color: theme.colors.primary,
    margin: 4,
    textAlign: 'center',
    marginHorizontal: 50,
  },
  buttonContainer: {
    marginVertical: 16,
  },
})

export default ServerError
