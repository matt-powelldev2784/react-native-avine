import { useFormik } from 'formik'

interface useFormikJobStatsProps {
  setDateRange: (jobStats: any) => void
}

const useFormikJobStats = ({ setDateRange }: useFormikJobStatsProps) => {
  const formik = useFormik({
    initialValues: {
      dateRange: '',
    },
    onSubmit: async (values) => {
      const dateRangeObject = JSON.parse(values.dateRange)
      setDateRange(dateRangeObject)
    },
  })

  return { formik }
}

export default useFormikJobStats
