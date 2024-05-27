import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { DocumentSnapshot, DocumentData } from 'firebase/firestore'
import { RoundWithIdT } from '../../../../types/RoundT'

interface RoundDataT {
  lastVisibleDocument: DocumentSnapshot | null
  roundData: RoundWithIdT[]
  setRoundData: Dispatch<SetStateAction<RoundWithIdT[]>>
  setLastVisibleDocument: Dispatch<
    SetStateAction<DocumentSnapshot<DocumentData, DocumentData> | null>
  >
  docCount: number | null
}

export const useClientData = (data: any): RoundDataT => {
  const [lastVisibleDocument, setLastVisibleDocument] =
    useState<DocumentSnapshot | null>(null)
  const [roundData, setRoundData] = useState<RoundWithIdT[]>([])
  const [docCount, setDocCount] = useState<number | null>(null)

  useEffect(() => {
    if (data?.lastVisible) {
      const lastRecord = data.lastVisible as DocumentSnapshot
      setLastVisibleDocument(lastRecord)
    }
    if (data?.clients) {
      const rounds = data.rounds as RoundWithIdT[]
      setRoundData((prev) => [...prev, ...rounds])
    }
    if (data?.count >= 0) {
      setDocCount(data.count)
    }
  }, [data])

  return {
    roundData,
    lastVisibleDocument,
    setRoundData,
    setLastVisibleDocument,
    docCount,
  }
}
