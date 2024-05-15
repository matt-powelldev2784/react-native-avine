import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import theme from '../../utils/theme/theme'

interface ShortNameTextProps {
  text: string
}

const ShortNameText = ({ text }: ShortNameTextProps) => {
  const shortText = text
    .split(' ')
    .map((word): string => word[0])
    .join('')
    .substring(0, 3)

  return (
    <View style={styles.jobShortNameContainer}>
      <Text style={styles.jobShortNameText}>
        {shortText.slice(0, 1).toUpperCase()}
      </Text>
      {shortText.length > 1 && (
        <Text style={styles.jobShortNameText}>
          {shortText.slice(1, 2).toUpperCase()}
        </Text>
      )}
      {shortText.length > 2 && (
        <Text style={styles.jobShortNameText}>
          {shortText.slice(2, 3).toUpperCase()}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  jobShortNameContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 10,
    width: 28,
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  jobShortNameText: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 28,
  },
})

export default ShortNameText
