import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

interface ScreenMenuProps {
  title: string
}

const ScreenMenu = ({ title }: ScreenMenuProps) => {
  return (
    <View style={styles.pageContianer}>
      <Text style={styles.pageTitle}>{title}</Text>
      <TouchableOpacity style={styles.button}>
        <Image
          source={require('../../../assets/plus.png')}
          style={{ width: 20, height: 20 }}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  pageContianer: {
    backgroundColor: '#ae337b',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 4,
  },
  pageTitle: {
    fontSize: 20,
    color: 'white',
    marginTop: 2,
    marginBottom: 2,
    fontWeight: 'bold',
  },
})

export default ScreenMenu
