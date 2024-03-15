import React from 'react'
import { Dashboard, ServerError, ScreenMenu } from '../../components'
import { FlatList, View } from 'react-native'

const Error = () => {
  // flatlist is used to render children to allow the
  // dashboatd header to be sticky in the webview
  const childrenArray = [<ServerError key={1} />]

  return (
    <>
      <Dashboard>
        <ScreenMenu title={'Server Error'} bgColor={'red'} />

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

export default Error
