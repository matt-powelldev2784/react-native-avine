import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import InputField from '../../../../ui/formElements/InputField'
import Dropdown from '../../../../ui/formElements/DropDown'
import useFormikSteps from '../../addClient/hooks/useFormikSteps'
import ClientListItem from '../clientListItem/ClientListItem'
import { ClientWithIdT } from '../../../../types/ClientT'
import Button from '../../../../ui/button/Button'
import theme from '../../../../utils/theme/theme'
import usePostApiData from '../../../../utils/hooks/usePostApiData'
import { getAllClients } from '../../../../db/clients/getAllClients'

const ClientListWebView = () => {
  //hooks
  const {
    postApiIsLoading: searchApiIsLoading,
    setApiFunction,
    data,
  } = usePostApiData({})

  const handleSearchPress = () => {
    setApiFunction(() => async () => getAllClients())
  }

  // temp
  const activeStep = 1
  const { formik } = useFormikSteps({
    activeStep,
  })

  //variables
  const clientData = data as ClientWithIdT[] | null
  const clientDataHasLength = clientData && clientData.length > 0
  const ClientCards = clientDataHasLength
    ? clientData.map((client) => {
        return <ClientListItem {...client} key={client.id} />
      })
    : null

  return (
    <View style={styles.largeWebContainer}>
      <View style={styles.largeWebSearch}>
        <Text style={styles.searchTitle}>Search Clients</Text>
        <InputField
          formik={formik}
          name="name"
          placeholder="Seach Term"
          title="Search Term"
          imageName={'person'}
        />
        <Dropdown
          formik={formik}
          name="searchField"
          placeholder="Search By"
          title="Search By"
          options={[{ label: 'name', value: 'Name' }]}
          imageName={'person'}
        />
        <Button
          onPress={handleSearchPress}
          text="Search"
          isLoading={searchApiIsLoading}
        />
      </View>

      <View style={styles.largeWebCards}>{ClientCards}</View>
    </View>
  )
}

export default ClientListWebView

const styles = StyleSheet.create({
  largeWebContainer: {
    flexDirection: 'row',
    justifyItems: 'center',
    alignItems: 'flex-start',
    gap: 40,
    width: '100%',
    height: '100%',
    maxWidth: 1200,
    flex: 1,
    marginTop: 20,
    padding: 20,
  },
  largeWebSearch: {
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 700,
    width: '30%',
    height: '100%',
    minHeight: 1000,
    backgroundColor: theme.colors.backgroundGrey,
  },
  searchTitle: {
    color: theme.colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    width: '100%',
  },
  largeWebCards: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
})
