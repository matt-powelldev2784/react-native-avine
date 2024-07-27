import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../screens/stackNavigator/StackNavigator'

interface InstructionBoxProps {
  number: string
  text: string
  secondaryText?: string
  teriaryText?: string
  navigateTo: keyof RootStackParamList
  backgroundColor: string
}

const InstructionBox = ({
  number,
  text,
  secondaryText,
  teriaryText,
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
      {secondaryText ? (
        <Text style={styles.secondaryText}>{secondaryText}</Text>
      ) : null}
      {teriaryText ? (
        <Text style={styles.tertiaryText}>{teriaryText}</Text>
      ) : null}
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
    paddingBottom: 6,
    paddingHorizontal: 16,
  },
  instructionNumber: {
    fontSize: 50,
    color: 'white',
    height: 50,
    fontFamily: 'Roboto_700Bold',
  },
  primaryText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    height: 22,
    fontFamily: 'Roboto_700Bold',
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

export default InstructionBox
