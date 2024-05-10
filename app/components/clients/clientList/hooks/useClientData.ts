import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { DocumentSnapshot, DocumentData } from 'firebase/firestore'
import { ClientWithIdT } from '../../../../types/ClientT'

interface ClientDataT {
  lastVisible: DocumentSnapshot | null
  clientData: ClientWithIdT[]
  setClientData: Dispatch<SetStateAction<ClientWithIdT[]>>
  setLastVisible: Dispatch<
    SetStateAction<DocumentSnapshot<DocumentData, DocumentData> | null>
  >
}

export const useClientData = (data: any): ClientDataT => {
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null)
  const [clientData, setClientData] = useState<ClientWithIdT[]>([])

  useEffect(() => {
    if (data?.lastVisible) {
      const lastRecord = data.lastVisible as DocumentSnapshot
      setLastVisible(lastRecord)
    }
    if (data?.clients) {
      const clients = data.clients as ClientWithIdT[]
      setClientData((prev) => [...prev, ...clients])
    }
  }, [data])

  return { clientData, lastVisible, setClientData, setLastVisible }
}
