import {
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  View,
  DimensionValue,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import theme from '../../utils/theme/theme'

interface ButtoMdProps {
  backgroundColor?: string
  text: string
  isLoading?: boolean
  disabled?: boolean
  opacity?: number
  width?: DimensionValue
  height?: DimensionValue
  icon?: string
  onPress: () => void
}

const ButtonWithIcon = ({
  backgroundColor,
  text,
  isLoading,
  disabled,
  opacity,
  width,
  height,
  icon,
  onPress,
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
      {!isLoading ? (
        <View style={styles.buttonContent}>
          <Image
            source={icon ? { uri: icon } : require('../../../assets/plus.png')}
            style={{ width: 18, height: 18 }}
          />
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      ) : null}

      {isLoading ? <ActivityIndicator size="small" color={'white'} /> : null}
    </TouchableOpacity>
  )
}

export default ButtonWithIcon

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    padding: 10,
    paddingHorizontal: 4,
    borderRadius: 8,
    width: '100%',
    maxWidth: 220,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    width: 105,
    textAlign: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
})
