import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native'
import React from 'react'
import theme from '../../utils/theme/theme'

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

      {isLoading ? (
        <ActivityIndicator size="small" color={theme.colors.primary} />
      ) : null}
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  button: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
