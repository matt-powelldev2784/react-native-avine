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
  netPriceRef: React.MutableRefObject<string>
  taxRateRef: React.MutableRefObject<string>
}

export const useCalculateTotal = ({
  formik,
  netPriceRef,
  taxRateRef,
}: UseCalculateTotalT) => {
  useEffect(() => {
    netPriceRef.current = formik.values.price
    taxRateRef.current = formik.values.taxRate
    const totalPrice =
      Number(netPriceRef.current) * (1 + Number(taxRateRef.current) / 100)
    formik.setFieldValue('TotalAmount', totalPrice.toString())
  }, [formik.values.price, formik.values.taxRate, formik.values.totalPrice])
}
