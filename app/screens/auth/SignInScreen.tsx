import { View, StyleSheet } from 'react-native'
import React from 'react'

import theme from '../../utils/theme/theme'
import { SignIn } from '../../components'

const SignInScreen = () => {
  return (
    <View style={styles.container}>
      <SignIn />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primary,
    minHeight: 400,
  },
})

export default SignInScreen
