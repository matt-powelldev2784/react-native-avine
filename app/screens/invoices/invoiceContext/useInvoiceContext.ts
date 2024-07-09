import { createContext, useContext } from 'react'

interface PlannerContextType {
  invoiceCardNeedsUpdate: boolean
  setInvoiceCardNeedsUpdate: (value: boolean) => void
}

export const InvoiceContext = createContext<PlannerContextType>({
  invoiceCardNeedsUpdate: false,
  setInvoiceCardNeedsUpdate: () => {},
})

export const useInvoiceContext = () => useContext(InvoiceContext)
