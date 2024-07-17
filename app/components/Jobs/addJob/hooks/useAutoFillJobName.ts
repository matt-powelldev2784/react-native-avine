import { useEffect } from 'react'

interface UseCalculateTotalT {
  formik: {
    values: {
      price: string
      taxRate: string
      [key: string]: any // To accommodate other formik.values properties
    }
    setFieldValue: (field: string, value: any) => void
  }
  jobNameIsAutoFill: React.SetStateAction<boolean>
  contactNameRef: React.MutableRefObject<string>
  addressRef: React.MutableRefObject<string>
}

export const useAutoFillJobName = ({
  formik,
  jobNameIsAutoFill,
  contactNameRef,
  addressRef,
}: UseCalculateTotalT) => {
  useEffect(() => {
    if (jobNameIsAutoFill) {
      contactNameRef.current = formik.values.contactName
      addressRef.current = formik.values.address
      formik.values.jobName = `${addressRef.current} ${contactNameRef.current}`
    }
  }, [formik.values.contactName, formik.values.address, formik.values.jobName])
}
