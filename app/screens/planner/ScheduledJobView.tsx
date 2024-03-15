import React from 'react'
import { ScreenMenu, ScheduledJobCard } from '../../components'
import theme from '../../utils/theme/theme'
import { FlatList, StyleSheet, View } from 'react-native'

const ScheduledJobView = () => {
  // flatlist is used to render children to allow the
  // dashboatd header to be sticky in the webview
  const childrenArray = [<ScheduledJobCard key={1} />]

  return (
    <>
      <ScreenMenu
        title={'Scheduled Job Details'}
        bgColor={theme.colors.plannerPrimary}
      />

      <FlatList
        style={styles.flatlist}
        data={childrenArray}
        renderItem={({ item }) => <View>{item}</View>}
        keyExtractor={(item, index) => `child-${index}`}
      />
    </>
  )
}

const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.backgroundGrey,
  },
})
export default ScheduledJobView
