import React from 'react'
import { ScheduleRoundForm, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'
import { FlatList, View } from 'react-native'

const ScheduleRoundFormView = () => {
  // flatlist is used to render children to allow the
  // dashboatd header to be sticky in the webview
  const childrenArray = [<ScheduleRoundForm key={1} />]

  return (
    <>
      <ScreenMenu
        title={'Schedule Round'}
        bgColor={theme.colors.plannerPrimary}
      />
      <FlatList
        style={{ flex: 1, width: '100%' }}
        data={childrenArray}
        renderItem={({ item }) => <View>{item}</View>}
        keyExtractor={(item, index) => `child-${index}`}
      />
    </>
  )
}

export default ScheduleRoundFormView
