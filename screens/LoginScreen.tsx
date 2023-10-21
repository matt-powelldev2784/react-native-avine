import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../StackNavigator'

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>()

  return (
    <View className="w-full h-full flex-1 bg-blue-500">
      <Text>LoginScreen</Text>
      <Button
        title="login"
        onPress={() => {
          navigation.navigate('Home')
        }}
      />
    </View>
  )
}

export default LoginScreen
