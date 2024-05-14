import React from 'react'
import { Dashboard, ClientCard, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'
import { FlatList, View } from 'react-native'
import { RootStackParamList } from '../stackNavigator/StackNavigator'
import { RouteProp, useRoute } from '@react-navigation/native'

type ClientCardRouteProp = RouteProp<RootStackParamList, 'ClientCardView'>

const ClientCardView = () => {
  const route = useRoute<ClientCardRouteProp>()
  const clientId = route?.params?.clientId ? route?.params?.clientId : ''

  // flatlist is used to render children to allow the
  // dashboard header to be sticky in the webview
  const childrenArray = [<ClientCard key={clientId} clientId={clientId} />]

  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Client Details'}
          bgColor={theme.colors.invoicePrimary}
          buttonText="buttonText"
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

export default ClientCardView
