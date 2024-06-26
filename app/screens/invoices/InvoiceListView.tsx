import React from 'react'
import { Dashboard, InvoiceList, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'
import { FlatList, View } from 'react-native'

const InvoiceListView = () => {
  // flatlist is used to render children to allow the
  // dashboatd header to be sticky in the webview
  const childrenArray = [<InvoiceList key={0} />]

  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Invoice Database'}
          bgColor={theme.colors.invoicePrimary}
        />

        <FlatList
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: theme.colors.tertiaryBlue,
          }}
          data={childrenArray}
          renderItem={({ item }) => <View>{item}</View>}
          keyExtractor={(item, index) => `child-${index}`}
        />
      </Dashboard>
    </>
  )
}

export default InvoiceListView
