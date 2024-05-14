import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../screens/stackNavigator/StackNavigator'

interface InstructionBoxProps {
  number: string
  text: string
  secondaryText: string
  navigateTo: keyof RootStackParamList
  backgroundColor: string
}

const InstructionBox = ({
  number,
  text,
  secondaryText,
  navigateTo,
  backgroundColor,
}: InstructionBoxProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const backgroundStyle = { backgroundColor: backgroundColor }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(navigateTo)}
      style={[styles.instructionConatiner, backgroundStyle]}
    >
      <Text style={styles.instructionNumber}>{number}</Text>
      <Text style={styles.primaryText}>{text}</Text>
      <Text style={styles.secondaryText}>{secondaryText}</Text>
    </TouchableOpacity>
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
    paddingTop: 8,
    paddingBottom: 6,
    paddingHorizontal: 16,
  },
  instructionNumber: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    height: 50,
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
})

export default InstructionBox
