import { useFormik } from 'formik'
import usePostApiData from '../../../../utils/hooks/usePostApiData'
import { DocumentSnapshot } from 'firebase/firestore'
import { useJobData } from './useJobData'
import { getAllJobsWithLimit } from '../../../../db/jobs/getAllJobsWithLimit'
import { JobWithIdT } from '../../../../types/JobT'
import { searchJobs } from '../../../../db/jobs/searchJobs'

interface JobDataT {
  lastVisible: DocumentSnapshot | null
  jobs: JobWithIdT[]
}

const useFormikSearch = () => {
  const {
    postApiIsLoading: searchApiIsLoading,
    setApiFunction,
    data,
  } = usePostApiData<JobDataT>({})

  const {
    jobData,
    lastVisibleDocument,
    setJobData,
    setLastVisibleDocument,
    docCount,
  } = useJobData(data)

  const formik = useFormik({
    initialValues: {
      searchTerm: '',
      searchField: '_searchJobName',
      findAll: true,
    },
    onSubmit: async (values) => {
      formik.values.findAll
        ? setApiFunction(
            () => async () => getAllJobsWithLimit(lastVisibleDocument),
          )
        : setApiFunction(
            () => async () =>
              searchJobs({
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
    jobData,
    setJobData,
    setLastVisibleDocument,
    docCount,
  }
}

export default useFormikSearch
