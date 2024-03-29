import React from 'react'
import { Dashboard, DueInvoiceList, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'
import { FlatList, View } from 'react-native'

const DueInvoices = () => {
  // flatlist is used to render children to allow the
  // dashboatd header to be sticky in the webview
  const childrenArray = [<DueInvoiceList key={0} />]

  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Due Invoices'}
          bgColor={theme.colors.invoicePrimary}
          navigateTo="PaidInvoices"
          buttonText="Paid Invoices"
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

export default DueInvoices
