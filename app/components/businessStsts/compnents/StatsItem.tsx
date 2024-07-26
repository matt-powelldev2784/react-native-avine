import { Text, StyleSheet, View } from 'react-native'
import React from 'react'

interface InstructionBoxProps {
  number: string
  text: string
  backgroundColor: string
}

const StatsItem = ({ number, text, backgroundColor }: InstructionBoxProps) => {
  const backgroundStyle = { backgroundColor: backgroundColor }

  return (
    <View style={[styles.instructionConatiner, backgroundStyle]}>
      <Text style={styles.instructionNumber}>{number}</Text>
      <Text style={styles.primaryText}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  instructionConatiner: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 4,
    width: 300,
    height: 180,
    borderRadius: 12,
    paddingBottom: 6,
    paddingHorizontal: 16,
  },
  instructionNumber: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    height: 60,
  },
  primaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    height: 25,
  },
  secondaryText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  tertiaryText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
})

export default StatsItem
