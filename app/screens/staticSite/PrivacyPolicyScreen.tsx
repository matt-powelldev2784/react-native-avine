import React from 'react'
import { PrivacyPolicy } from '../../components'
import { View } from 'react-native'
import theme from '../../utils/theme/theme'

const PrivacyPolicyScreen = () => {
  return (
    <View style={{ height: '100%', backgroundColor: theme.colors.primary }}>
      <PrivacyPolicy />
    </View>
  )
}

export default PrivacyPolicyScreen
