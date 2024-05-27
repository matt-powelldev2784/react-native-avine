import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { DocumentSnapshot, DocumentData } from 'firebase/firestore'
import { ClientWithIdT } from '../../../../types/ClientT'

interface ClientDataT {
  lastVisibleDocument: DocumentSnapshot | null
  clientData: ClientWithIdT[]
  setClientData: Dispatch<SetStateAction<ClientWithIdT[]>>
  setLastVisibleDocument: Dispatch<
    SetStateAction<DocumentSnapshot<DocumentData, DocumentData> | null>
  >
  docCount: number | null
}

export const useClientData = (data: any): ClientDataT => {
  const [lastVisibleDocument, setLastVisibleDocument] =
    useState<DocumentSnapshot | null>(null)
  const [clientData, setClientData] = useState<ClientWithIdT[]>([])
  const [docCount, setDocCount] = useState<number | null>(null)

  useEffect(() => {
    if (data?.lastVisible) {
      const lastRecord = data.lastVisible as DocumentSnapshot
      setLastVisibleDocument(lastRecord)
    }
    if (data?.clients) {
      const clients = data.clients as ClientWithIdT[]
      setClientData((prev) => [...prev, ...clients])
    }
    if (data?.count >= 0) {
      setDocCount(data.count)
    }
  }, [data])

  return {
    clientData,
    lastVisibleDocument,
    setClientData,
    setLastVisibleDocument,
    docCount,
  }
}
