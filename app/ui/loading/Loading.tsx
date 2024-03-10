import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'
import React from 'react'
import theme from '../../utils/theme/theme'

interface LoadingProps {
  loadingText: string
}

const Loading = ({ loadingText }: LoadingProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        style={{
          marginTop: 32,
          marginBottom: 16,
        }}
        size="large"
        color={theme.colors.primary}
      />
      <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
        {loadingText}
      </Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
