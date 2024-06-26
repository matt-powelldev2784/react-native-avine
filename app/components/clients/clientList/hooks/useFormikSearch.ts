import { useFormik } from 'formik'
import usePostApiData from '../../../../utils/hooks/usePostApiData'
import { searchClients } from '../../../../db/clients/searchClients'
import { DocumentSnapshot } from 'firebase/firestore'
import { ClientWithIdT } from '../../../../types/ClientT'
import { getAllClientsLimit } from '../../../../db/clients/getAllClientsLimit'
import { useClientData } from './useClientData'

interface ClientDataT {
  lastVisible: DocumentSnapshot | null
  clients: ClientWithIdT[]
}

const useFormikSearch = () => {
  const {
    postApiIsLoading: searchApiIsLoading,
    setApiFunction,
    data,
  } = usePostApiData<ClientDataT>({})

  const {
    clientData,
    lastVisibleDocument,
    setClientData,
    setLastVisibleDocument,
    docCount,
  } = useClientData(data)

  const formik = useFormik({
    initialValues: {
      searchTerm: '',
      searchField: '_searchName',
      findAll: true,
    },
    onSubmit: async (values) => {
      formik.values.findAll
        ? setApiFunction(
            () => async () => getAllClientsLimit(lastVisibleDocument),
          )
        : setApiFunction(
            () => async () =>
              searchClients({
                searchTerm: values.searchTerm,
                searchField: values.searchField,
                lastVisible: lastVisibleDocument,
              }),
          )
    },
  })

  return {
    searchApiIsLoading,
    formik,
    clientData,
    setClientData,
    setLastVisibleDocument,
    docCount,
  }
}

export default useFormikSearch
