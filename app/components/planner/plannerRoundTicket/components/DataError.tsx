import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import theme from '../../../../utils/theme/theme'

const DataError = () => {
  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Image
          source={require('../../../../../../../assets/calendar_icon_large.png')}
          style={{ width: 50, height: 50, marginBottom: 8 }}
        />

        <Text style={styles.primaryText}>Server Error</Text>
        <Text style={styles.secondaryText}>Unable to load data</Text>
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
    color: theme.colors.primary,
    marginTop: 16,
    fontFamily: 'Roboto_700Bold',
  },
  secondaryText: {
    fontSize: 18,
    color: theme.colors.primary,
    margin: 4,
    textAlign: 'center',
    marginHorizontal: 50,
    fontFamily: 'Roboto_400Regular',
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
    fontSize: 16,
    fontFamily: 'Roboto_700Bold',
  },
})

export default DataError
