import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ClientsMenu = () => {
  return (
    <View style={styles.container}>
      <Text>ClientMenuButtons</Text>
    </View>
  )
}

export default ClientsMenu

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyItems: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 40,
    width: '100%',
    height: '100%',
    flex: 1,
    marginTop: 12,
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
})
