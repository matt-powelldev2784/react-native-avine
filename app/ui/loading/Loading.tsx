import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'
import React from 'react'
import theme from '../../utils/theme/theme'

interface LoadingProps {
  loadingText: string
  color?: string
}

const Loading = ({ loadingText, color }: LoadingProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        style={{
          marginTop: 32,
          marginBottom: 16,
        }}
        size="large"
        color={color ? color : theme.colors.primary}
      />
      <Text
        style={{
          color: color ? color : theme.colors.primary,
          fontFamily: 'Roboto_700Bold',
        }}
      >
        {loadingText}
      </Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
