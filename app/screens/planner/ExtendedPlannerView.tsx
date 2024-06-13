import React from 'react'
import { ExtendedPlanner, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'
import { FlatList, View } from 'react-native'

const ExtendedPlannerView = () => {
  // flatlist is used to render children to allow the
  // dashboard header to be sticky in the webview
  const childrenArray = [<ExtendedPlanner key={0} />]

  return (
    <>
      <>
        <ScreenMenu
          title={'Extended Planner'}
          bgColor={theme.colors.invoicePrimary}
        />

        <FlatList
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: theme.colors.backgroundGrey,
          }}
          data={childrenArray}
          renderItem={({ item }) => <View>{item}</View>}
          keyExtractor={(item, index) => `child-${index}`}
        />
      </>
    </>
  )
}

export default ExtendedPlannerView
