import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import theme from '../../../../utils/theme/theme'

const NoDataFound = () => {
  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Image
          source={require('../../../../../assets/not_found.png')}
          style={{ width: 47, height: 48, marginBottom: 4 }}
        />

        <Text style={styles.primaryText}>No Invoices Found!</Text>
        <Text style={styles.secondaryText}>
          Please try a different search. Alternatively click the find all due
          invoices button or find all paid invoices button.
        </Text>
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
    color: 'black',
  },
  secondaryText: {
    fontSize: 18,
    color: 'black',
    margin: 4,
    textAlign: 'center',
    marginHorizontal: 20,
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
    width: 200,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default NoDataFound
