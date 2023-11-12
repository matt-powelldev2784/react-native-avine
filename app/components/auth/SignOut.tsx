import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebaseConfig'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../StackNavigator'

const SignOut = ({ promptAsync }: any) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const signOutHandler = async () => {
    await signOut(auth)
    AsyncStorage.removeItem('@user')
    navigation.navigate('SignIn')
  }

  return (
    <View>
      <Text>SignOut</Text>
      <TouchableOpacity onPress={signOutHandler}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignOut
