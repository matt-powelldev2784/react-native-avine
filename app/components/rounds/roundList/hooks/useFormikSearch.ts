import { useFormik } from 'formik'
import usePostApiData from '../../../../utils/hooks/usePostApiData'
import { DocumentSnapshot } from 'firebase/firestore'
import { useRoundData } from './useRoundData'
import { RoundWithIdT } from '../../../../types/RoundT'
import { searchRounds } from '../../../../db/rounds/searchRounds'
import { getAllRoundsWithLimit } from '../../../../db/rounds/gteAllRoundsWithLimit'

interface RoundDataT {
  lastVisible: DocumentSnapshot | null
  rounds: RoundWithIdT[]
}

const useFormikSearch = () => {
  const {
    postApiIsLoading: searchApiIsLoading,
    setApiFunction,
    data,
  } = usePostApiData<RoundDataT>({})

  const {
    roundData,
    lastVisibleDocument,
    setRoundData,
    setLastVisibleDocument,
    docCount,
  } = useRoundData(data)

  const formik = useFormik({
    initialValues: {
      searchTerm: '',
      searchField: '_searchName',
      findAll: true,
    },
    onSubmit: async (values) => {
      formik.values.findAll
        ? setApiFunction(
            () => async () => getAllRoundsWithLimit(lastVisibleDocument),
          )
        : setApiFunction(
            () => async () =>
              searchRounds({
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
    roundData,
    setRoundData,
    setLastVisibleDocument,
    docCount,
  }
}

export default useFormikSearch
