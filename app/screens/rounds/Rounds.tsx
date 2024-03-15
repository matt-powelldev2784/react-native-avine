import React from 'react'
import { Dashboard, RoundList, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'
import { FlatList, View } from 'react-native'

const Rounds = () => {
  // flatlist is used to render children to allow the
  // dashboatd header to be sticky in the webview
  const childrenArray = [<RoundList key={1} />]

  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Rounds'}
          navigateTo={'AddRound'}
          buttonText="Add Round"
          bgColor={theme.colors.roundPrimary}
        />
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

export default Rounds
