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
  disabled?: boolean
  opacity?: number
  width?: number | string
  height?: number | string
}

const Button = ({
  onPress,
  backgroundColor,
  text,
  isLoading,
  disabled,
  opacity,
  width,
  height,
}: ButtoMdProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        backgroundColor ? { backgroundColor: backgroundColor } : null,
        opacity ? { opacity: opacity } : null,
        width ? { width: width } : null,
        height ? { height: height } : null,
      ]}
      disabled={isLoading || disabled}
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
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    padding: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '100%',
    maxWidth: 270,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
})
