import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import React from 'react'
import theme from '../../utils/theme/theme'

interface ButtoMdProps {
  onPress: () => void
  backgroundColor?: string
  text: string
  isLoading?: boolean
}

const Button = ({
  onPress,
  backgroundColor,
  text,
  isLoading,
}: ButtoMdProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        backgroundColor ? { backgroundColor: backgroundColor } : null,
      ]}
      disabled={isLoading}
    >
      {!isLoading ? <Text style={styles.buttonText}>{text}</Text> : null}

      {isLoading ? <ActivityIndicator size="small" color={'white'} /> : null}
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    maxWidth: 270,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})
