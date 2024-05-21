import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { DocumentSnapshot, DocumentData } from 'firebase/firestore'
import { JobWithIdT } from '../../../../types/JobT'

interface JobDataT {
  lastVisibleDocument: DocumentSnapshot | null
  jobData: JobWithIdT[]
  setJobData: Dispatch<SetStateAction<JobWithIdT[]>>
  setLastVisibleDocument: Dispatch<
    SetStateAction<DocumentSnapshot<DocumentData, DocumentData> | null>
  >
  docCount: number | null
}

export const useJobData = (data: any): JobDataT => {
  const [lastVisibleDocument, setLastVisibleDocument] =
    useState<DocumentSnapshot | null>(null)
  const [jobData, setJobData] = useState<JobWithIdT[]>([])
  const [docCount, setDocCount] = useState<number | null>(null)

  useEffect(() => {
    if (data?.lastVisible) {
      const lastRecord = data.lastVisible as DocumentSnapshot
      setLastVisibleDocument(lastRecord)
    }
    if (data?.jobs) {
      const jobs = data.jobs as JobWithIdT[]
      setJobData((prev) => [...prev, ...jobs])
    }
    if (data?.count) {
      setDocCount(data.count)
    }
  }, [data])

  return {
    jobData,
    lastVisibleDocument,
    setJobData,
    setLastVisibleDocument,
    docCount,
  }
}
