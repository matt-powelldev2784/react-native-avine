import React from 'react'
import { Dashboard, RoundMenu, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'
import { FlatList, View } from 'react-native'

const RoundMenuScreen = () => {
  // flatlist is used to render children to allow the
  // dashboatd header to be sticky in the webview
  const childrenArray = [<RoundMenu key={1} />]

  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Round Database'}
          bgColor={theme.colors.roundPrimary}
        />
        <FlatList
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: theme.colors.backgroundGrey,
          }}
          data={childrenArray}
          renderItem={({ item }) => <View>{item}</View>}
          keyExtractor={(item, index) => `child-${index}`}
        />
      </Dashboard>
    </>
  )
}

export default RoundMenuScreen
