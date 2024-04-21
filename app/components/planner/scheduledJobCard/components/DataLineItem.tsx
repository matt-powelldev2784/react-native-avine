import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import theme from '../../../../utils/theme/theme'

interface DataLineProps {
  name: string
  value: string | number
}

const DataLineItem = ({ name, value }: DataLineProps) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <Text style={styles.value} numberOfLines={1} ellipsizeMode="tail">
          {value}
        </Text>
      </View>
      <View style={styles.line} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    color: theme.colors.primary,
  },
  value: {
    fontSize: 16,
    color: 'black',
    maxWidth: '70%',
  },
  line: {
    marginTop: 8,
    height: 1,
    backgroundColor: theme.colors.primary,
  },
})

export default DataLineItem
