import {
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  View,
  DimensionValue,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import React from 'react'
import theme from '../../../../utils/theme/theme'

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

const RoundButtonWithIcon = ({
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
    <>
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
              source={icon ? icon : require('../../../../../assets/plus.png')}
              style={{ width: 18, height: 18 }}
            />
            <Text style={styles.buttonText}>{text}</Text>
          </View>
        ) : null}

        {isLoading ? <ActivityIndicator size="small" color={'white'} /> : null}
      </TouchableOpacity>
    </>
  )
}

export default RoundButtonWithIcon

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 6,
    borderRadius: 8,
    width: '100%',
    maxWidth: 220,
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderColor: theme.colors.backgroundGrey,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    width: 100,
    fontFamily: 'Roboto_700Bold',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
})
