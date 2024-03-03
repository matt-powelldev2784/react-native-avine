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

const ModalButton = ({
  onPress,
  backgroundColor,
  text,
  isLoading,
}: ButtoMdProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        backgroundColor ? { backgroundColor: backgroundColor } : null,
      ]}
      onPress={onPress}
      disabled={isLoading}
    >
      {!isLoading ? <Text style={styles.buttonText}>{text}</Text> : null}
      {isLoading ? <ActivityIndicator size="small" color={'white'} /> : null}
    </TouchableOpacity>
  )
}

export default ModalButton

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    maxWidth: 120,
    minWidth: 100,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})
