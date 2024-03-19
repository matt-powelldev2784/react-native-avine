import React from 'react'
import { Dashboard, InvoiceCard, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'
import { FlatList, View } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../stackNavigator/StackNavigator'

type InvoiceCardRouteProp = RouteProp<RootStackParamList, 'InvoiceCardView'>

const InvoiceCardView = () => {
  const route = useRoute<InvoiceCardRouteProp>()
  const invoiceId = route?.params?.invoiceId ? route?.params?.invoiceId : ''

  // flatlist is used to render children to allow the
  // dashboatd header to be sticky in the webview
  const childrenArray = [<InvoiceCard key={invoiceId} invoiceId={invoiceId} />]

  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Invoice Details'}
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
      </Dashboard>
    </>
  )
}

export default InvoiceCardView
