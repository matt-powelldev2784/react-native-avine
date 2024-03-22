import React from 'react'
import { Dashboard, PaidInvoiceList, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'
import { FlatList, View } from 'react-native'

const PaidInvoices = () => {
  // flatlist is used to render children to allow the
  // dashboatd header to be sticky in the webview
  const childrenArray = [<PaidInvoiceList key={0} />]

  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Paid Invoices'}
          bgColor={theme.colors.invoicePrimary}
          navigateTo="DueInvoices"
          buttonText="Due Invoices"
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

export default PaidInvoices
