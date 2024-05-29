import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ViewStyle,
} from 'react-native'
import React, { useState } from 'react'
import InputField from '../../../ui/formElements/InputField'
import Dropdown from '../../../ui/formElements/DropDown'
import Button from '../../../ui/button/Button'
import theme from '../../../utils/theme/theme'
import useFormikSearch from './hooks/useFormikSearch'
import NoDataFound from './components/NoDataFound'
import useResetSearchOnFocus from '../../../utils/hooks/useResetSearchOnFocus'
import { useDeviceType } from '../../../utils/deviceTypes'
import { InvoiceWithIdT } from '../../../types/InvoiceT'
import InvoiceListItem from './components/InvoiceListItem'

const InvoiceList = () => {
  //state
  const [searchIsActive, setSearchIsActive] = useState<boolean>(false)

  //hooks
  const { isLargeWeb } = useDeviceType()
  useResetSearchOnFocus(() => {
    setInvoiceData([])
    setLastVisibleDocument(null)
    setSearchIsActive(false)
  })
  const {
    searchApiIsLoading,
    formik,
    invoiceData,
    setInvoiceData,
    setLastVisibleDocument,
    docCount,
    setDocCount,
  } = useFormikSearch()

  //functions
  const handleSearchAllDueInvoicesPress = () => {
    formik.setFieldValue('findAll', true)
    formik.setFieldValue('isPaid', false)
    resetSearchForm()
    formik.handleSubmit()
    setSearchIsActive(true)
  }
  const handleSearchAllPaidInvoicesPress = () => {
    formik.setFieldValue('findAll', true)
    formik.setFieldValue('isPaid', true)
    resetSearchForm()
    formik.handleSubmit()
    setSearchIsActive(true)
  }
  const handleSearchPress = async () => {
    formik.setFieldValue('findAll', false)
    resetSearchForm()
    formik.handleSubmit()
    setSearchIsActive(true)
  }
  const handleMoreResultsPress = async () => {
    formik.handleSubmit()
  }
  const resetSearchForm = () => {
    setInvoiceData([])
    setDocCount(null)
    setLastVisibleDocument(null)
    setSearchIsActive(false)
  }

  //variables
  const invoiceDataHasLength = invoiceData.length > 0
  const invoiceCards = invoiceDataHasLength
    ? invoiceData.map((invoice: InvoiceWithIdT) => {
        return <InvoiceListItem {...invoice} key={invoice.id} />
      })
    : null
  const allDataReturned = docCount === invoiceData.length

  //styles
  const deviceHeight =
    searchIsActive && !isLargeWeb ? 445 : Dimensions.get('window').height - 95
  const containerStyle: ViewStyle = !isLargeWeb
    ? { flexDirection: 'column' }
    : { flexDirection: 'row' }
  const searchContainerStyle: ViewStyle = isLargeWeb
    ? { width: '30%' }
    : { width: '100%' }
  const searchResultsStyle: ViewStyle = isLargeWeb
    ? { width: '70%' }
    : { width: '100%', paddingTop: 10 }
  const containerHeightStyle: ViewStyle = !searchIsActive
    ? { height: deviceHeight }
    : { height: '100%' }
  const buttonsContainerStyle: ViewStyle = isLargeWeb
    ? { maxWidth: 600 }
    : { maxWidth: 300 }

  return (
    <View style={[styles.container, containerStyle, containerHeightStyle]}>
      {/* -------------------- Header---------------------------- */}
      {!searchIsActive || (searchIsActive && !isLargeWeb) ? (
        <View style={[styles.headerContainer, { height: deviceHeight }]}>
          <Image
            source={require('../../../../assets/jobs.jpg')}
            style={{ width: '100%', height: deviceHeight, marginBottom: 8 }}
          />
        </View>
      ) : null}

      {/* -------------------- Search Container ---------------------------- */}
      <View style={[styles.searchContainer, searchContainerStyle]}>
        <View style={styles.searchTitleContainer}>
          <Image
            source={require('../../../../assets/search_white.png')}
            style={{ width: 25, height: 25 }}
          />
          <Text style={styles.searchTitle}>
            Search{' '}
            <Text
              style={[styles.searchTitle, { color: theme.colors.secondary }]}
            >
              Invoices
            </Text>
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={{ zIndex: 9999 }}>
            <Dropdown
              formik={formik}
              name="searchField"
              placeholder="Search By"
              title="Search By"
              options={[
                { label: 'Job Name', value: 'job._searchJobName' },
                { label: 'Job Contact Name', value: 'job._searchContactName' },
                { label: 'Client Contact Name', value: 'client._searchName' },
                {
                  label: 'Client Company Name',
                  value: 'client._searchCompanyName',
                },
              ]}
              imageName={'notes'}
            />
          </View>
          <InputField
            formik={formik}
            name="searchTerm"
            placeholder="Search Term"
            title="Search Term"
            imageName={'search'}
          />
          <Dropdown
            formik={formik}
            name="isPaid"
            placeholder="Invoice Paid"
            title="Invoice Paid"
            options={[
              { label: 'Yes - Invoice Paid', value: true },
              { label: 'No - Invoice Due', value: false },
            ]}
            imageName={'notes'}
          />
        </View>

        <View style={[styles.buttonContainer, buttonsContainerStyle]}>
          <View style={styles.findbuttonsContainer}>
            <Button
              onPress={handleSearchAllDueInvoicesPress}
              text="Find All Due Invoices"
              isLoading={searchApiIsLoading}
              backgroundColor={theme.colors.buttonSecondary}
              width={130}
            />
            <Button
              onPress={handleSearchAllPaidInvoicesPress}
              text="Find All Paid Invoices"
              isLoading={searchApiIsLoading}
              backgroundColor={theme.colors.buttonSecondary}
              width={130}
            />
          </View>
          <Button
            onPress={handleSearchPress}
            text="Search"
            isLoading={searchApiIsLoading}
            width={
              searchIsActive || (!searchIsActive && !isLargeWeb) ? '100%' : 130
            }
            height={
              searchIsActive || (!searchIsActive && !isLargeWeb) ? 40 : 60
            }
          />
        </View>
      </View>

      {/* -------------------- Job Cards ---------------------------- */}
      {searchIsActive ? (
        <View style={[styles.searchResultsContainer, searchResultsStyle]}>
          <View style={styles.searchTitleContainer}>
            <Image
              source={require('../../../../assets/search_white.png')}
              style={{ width: 25, height: 25 }}
            />
            <Text style={styles.searchTitle}>
              {docCount} Records{' '}
              <Text style={[styles.searchTitleSpan]}>Found</Text>
            </Text>
          </View>

          {invoiceCards}

          {docCount === 0 ? <NoDataFound /> : null}

          {invoiceDataHasLength ? (
            <View style={styles.buttonContainer}>
              <Button
                onPress={resetSearchForm}
                text="Reset Search Form"
                isLoading={false}
                backgroundColor={theme.colors.buttonSecondary}
              />
              <Button
                onPress={handleMoreResultsPress}
                text={allDataReturned ? 'No More Results' : 'Next 10 Results'}
                isLoading={searchApiIsLoading}
                opacity={allDataReturned ? 0.75 : 1}
                disabled={allDataReturned}
              />
            </View>
          ) : null}

          <View style={styles.footer} />
        </View>
      ) : null}
    </View>
  )
}

export default InvoiceList

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    justifyItems: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: theme.colors.tertiaryBlue,
  },
  headerContainer: {
    position: 'absolute',
    width: '100%',
    right: 0,
  },
  searchContainer: {
    width: '30%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 5,
    minWidth: 250,
    minHeight: 350,
    flex: 1,
    transform: [{ translateY: -5 }],
  },
  searchTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 30,
    marginTop: 30,
  },
  searchTitle: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchTitleSpan: {
    color: theme.colors.secondary,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    width: '90%',
    maxWidth: 600,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: 490,
    gap: 8,
    zIndex: -1,
  },
  findbuttonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 600,
    gap: 8,
    zIndex: -1,
  },
  searchResultsContainer: {
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: theme.colors.tertiaryBlue,
    marginBottom: 4,
    zIndex: -1,
    transform: [{ translateY: -5 }],
  },
  footer: {
    height: 80,
    width: '100%',
    minWidth: 300,
  },
})
