import React from 'react'
import { Dashboard, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'
import ClientList from '../../components/clients/clientList/ClientList'
import { FlatList, View } from 'react-native'

const Client = () => {
  // flatlist is used to render children to allow the
  // dashboatd header to be sticky in the webview
  const childrenArray = [<ClientList key={1} />]

  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Client List'}
          navigateTo={'AddClient'}
          buttonText="Add Client"
          bgColor={theme.colors.clientPrimary}
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
      </Dashboard>
    </>
  )
}

export default Client
