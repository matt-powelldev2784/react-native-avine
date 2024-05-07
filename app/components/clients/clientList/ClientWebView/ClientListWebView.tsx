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

  const handleSearchAllClientsPress = () => {
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
      <View style={styles.largeWebSearchContainer}>
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

          <View style={styles.buttonContainer}>
            <Button
              onPress={handleSearchAllClientsPress}
              text="Find All Clients"
              isLoading={searchApiIsLoading}
              backgroundColor={theme.colors.buttonSecondary}
            />
            <Button
              onPress={handleSearchAllClientsPress}
              text="Search"
              isLoading={searchApiIsLoading}
            />
          </View>
        </View>
      </View>

      <View style={styles.largeWebCards}>{ClientCards}</View>
      <View style={styles.footer} />
    </View>
  )
}

export default ClientListWebView

const styles = StyleSheet.create({
  largeWebContainer: {
    flexDirection: 'row',
    justifyItems: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 40,
    width: '100%',
    height: '100%',
    maxWidth: 1200,
    flex: 1,
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  largeWebSearchContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeWebSearch: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    maxWidth: 600,
    minWidth: 300,
    width: '95%',
    height: '100%',
    backgroundColor: theme.colors.backgroundGrey,
  },
  searchTitle: {
    color: theme.colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    width: '100%',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: 600,
    gap: 8,
  },
  largeWebCards: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  footer: {
    height: 40,
    width: '100%',
    minWidth: 300,
  },
})
