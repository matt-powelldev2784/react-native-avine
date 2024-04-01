import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native'
import React from 'react'

interface ButtoMdProps {
  onPress: () => void
  backgroundColor?: string
  isLoading?: boolean
  children?: React.ReactNode
}

const CustomButton = ({
  onPress,
  backgroundColor,
  isLoading,
  children,
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
      {!isLoading ? <View style={styles.buttonText}>{children}</View> : null}

      {isLoading ? <ActivityIndicator size="small" color={'white'} /> : null}
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
