import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import theme from '../../utils/theme/theme'

interface DataLineProps {
  name: string
  value: string | number
}

const LongDataItem = ({ name, value }: DataLineProps) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <View style={styles.line} />
        <Text style={styles.value}>
          {value === '' ? 'No notes available' : value}
        </Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    color: theme.colors.primary,
  },
  value: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  line: {
    marginVertical: 8,
    height: 1,
    backgroundColor: theme.colors.primary,
    width: '100%',
  },
})

export default LongDataItem
