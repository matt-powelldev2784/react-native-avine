import {
  Text,
  StyleSheet,
  ActivityIndicator,
  DimensionValue,
  TouchableOpacity,
  Platform,
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
  width?: DimensionValue
  height?: DimensionValue
  fontSize?: number
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
  fontSize,
}: ButtoMdProps) => {
  const fontSizeStyle = fontSize ? { fontSize: fontSize } : { fontSize: 17 }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        backgroundColor ? { backgroundColor } : {},
        opacity ? { opacity } : {},
        width ? { width: width } : null,
        height ? { height: height } : null,
      ]}
      disabled={isLoading || disabled}
    >
      {!isLoading ? (
        <Text style={[styles.buttonText, fontSizeStyle]}>{text}</Text>
      ) : null}
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
    maxWidth: 300,
    zIndex: 99999,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    maxHeight: 41,
    transform:
      Platform.OS === 'web' ? [{ translateY: 0 }] : [{ translateY: 0.8 }],
    fontFamily: 'LibreFranklin_600SemiBold',
    letterSpacing: 0.5,
  },
})
