import { View, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import InvoiceListItem from './invoiceListItem/InvoiceListItem'
import { Loading } from '../../../ui'
import ErrorNoData from './errorNoData/ErrorNoData'
import useGetApiData from '../../../utils/hooks/useGetApiData'
import { useRoute } from '@react-navigation/native'
import { InvoiceWithIdT } from '../../../types/InvoiceT'
import { getPaidInvoices } from '../../../db/invoice/getPaidInvoices'

const PaidInvoiceList = () => {
  const route = useRoute()
  const { getApiIsLoading, data } = useGetApiData({
    apiFunction: async () => getPaidInvoices(),
    route,
  })

  const invoiceData = data as InvoiceWithIdT[]

  if (getApiIsLoading) {
    return <Loading loadingText={'Loading jobs list...'} />
  }

  if (!invoiceData || invoiceData.length === 0) {
    return <ErrorNoData />
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        style={styles.cardsContainer}
        data={invoiceData}
        renderItem={({ item }) => <InvoiceListItem {...item} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<View style={styles.flatlistFooter} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  cardsContainer: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 70,
    paddingHorizontal: '2.5%',
    maxWidth: 700,
  },
  flatlistFooter: {
    height: 20,
  },
})

export default PaidInvoiceList
