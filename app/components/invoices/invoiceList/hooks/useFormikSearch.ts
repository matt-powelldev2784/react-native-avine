import { useFormik } from 'formik'
import usePostApiData from '../../../../utils/hooks/usePostApiData'
import { DocumentSnapshot } from 'firebase/firestore'
import { useInvoiceData } from './useInvoiceData'
import { getInvoicesWithLimit } from '../../../../db/invoice/getInvoicesWithLimit'
import { InvoiceWithIdT } from '../../../../types/InvoiceT'
import { searchInvoices } from '../../../../db/invoice/searchInvoices'

interface InvoiceDataT {
  lastVisible: DocumentSnapshot | null
  invoices: InvoiceWithIdT[]
}

const useFormikSearch = () => {
  const {
    postApiIsLoading: searchApiIsLoading,
    setApiFunction,
    data,
  } = usePostApiData<InvoiceDataT>({})

  const {
    invoiceData,
    lastVisibleDocument,
    setInvoiceData,
    setLastVisibleDocument,
    docCount,
  } = useInvoiceData(data)

  const formik = useFormik({
    initialValues: {
      searchTerm: '',
      searchField: 'job._searchJobName',
      findAll: true,
      isPaid: false,
    },
    onSubmit: async (values) => {
      formik.values.findAll
        ? setApiFunction(
            () => async () =>
              getInvoicesWithLimit({
                lastVisibleDocument,
                isPaid: values.isPaid,
              }),
          )
        : setApiFunction(
            () => async () =>
              searchInvoices({
                searchTerm: values.searchTerm,
                searchField: values.searchField,
                lastVisible: lastVisibleDocument,
                isPaid: values.isPaid,
              }),
          )
    },
  })

  return {
    searchApiIsLoading,
    formik,
    invoiceData,
    setInvoiceData,
    setLastVisibleDocument,
    docCount,
  }
}

export default useFormikSearch
