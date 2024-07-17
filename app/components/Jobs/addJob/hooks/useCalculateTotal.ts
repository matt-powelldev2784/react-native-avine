import { useEffect } from 'react'

interface UseCalculateTotalT {
  formik: {
    values: {
      price: string | number
      taxRate: string | number
      [key: string]: any
    }
    setFieldValue: (field: string, value: any) => void
  }
  netPriceRef: React.MutableRefObject<string | number>
  taxRateRef: React.MutableRefObject<string | number>
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
