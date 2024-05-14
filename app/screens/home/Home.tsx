import React from 'react'
import { Dashboard, ScreenMenu, Welcome } from '../../components'
import theme from '../../utils/theme/theme'
import { FlatList, View } from 'react-native'

const Home = () => {
  // flatlist is used to render children to allow the
  // dashboatd header to be sticky in the webview
  const childrenArray = [<Welcome key={1} />]

  return (
    <>
      <Dashboard>
        <ScreenMenu title={'Welcome'} bgColor={theme.colors.jobPrimary} />

        <FlatList
          style={{ flex: 1, width: '100%' }}
          data={childrenArray}
          renderItem={({ item }) => <View>{item}</View>}
          keyExtractor={(item, index) => `child-${index}`}
        />
      </Dashboard>
    </>
  )
}

export default Home
