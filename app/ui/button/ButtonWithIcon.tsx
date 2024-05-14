import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  View,
} from 'react-native'
import React from 'react'
import theme from '../../utils/theme/theme'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../screens/stackNavigator/StackNavigator'

interface ButtoMdProps {
  backgroundColor?: string
  text: string
  isLoading?: boolean
  disabled?: boolean
  opacity?: number
  navigateTo: keyof RootStackParamList
}

const ButtonWithIcon = ({
  backgroundColor,
  text,
  isLoading,
  disabled,
  opacity,
  navigateTo,
}: ButtoMdProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate(navigateTo)}
        style={[
          styles.button,
          backgroundColor ? { backgroundColor: backgroundColor } : null,
          opacity ? { opacity: opacity } : null,
        ]}
        disabled={isLoading || disabled}
      >
        {!isLoading ? (
          <View style={styles.buttonContent}>
            <Image
              source={require('../../../assets/plus.png')}
              style={{ width: 13, height: 13 }}
            />
            <Text style={styles.buttonText}>{text}</Text>
          </View>
        ) : null}

        {isLoading ? <ActivityIndicator size="small" color={'white'} /> : null}
      </TouchableOpacity>
    </>
  )
}

export default ButtonWithIcon

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    maxWidth: 220,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
})
