import { Text, StyleSheet, View } from 'react-native'
import React from 'react'

interface InstructionBoxProps {
  number: string
  text: string
  dateRangeTitle: string
  backgroundColor: string
}

const StatsItem = ({
  number,
  text,
  dateRangeTitle,
  backgroundColor,
}: InstructionBoxProps) => {
  const backgroundStyle = { backgroundColor: backgroundColor }

  return (
    <View style={[styles.instructionConatiner, backgroundStyle]}>
      <Text style={styles.instructionNumber}>{number}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.primaryText}>{text}</Text>
        <Text style={styles.primaryText}>{dateRangeTitle}</Text>
      </View>
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
    color: 'white',
    height: 60,
    marginTop: 8,
    fontFamily: 'Roboto_700Bold',
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  primaryText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    height: 19,
    fontFamily: 'Roboto_400Regular',
  },
  secondaryText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular',
  },
  tertiaryText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular',
  },
})

export default StatsItem
