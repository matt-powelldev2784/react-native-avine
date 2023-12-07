import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'

export const getRoundsFromDb = async () => {
  if (auth.currentUser === null) {
    return
  }

  const userDoc = doc(db, 'users', auth.currentUser.uid)
  const roundsCollection = collection(userDoc, 'rounds')
  const roundDocsSnapshot = await getDocs(roundsCollection)

  // const rounds = []
  // for (const roundDoc of roundDocsSnapshot.docs) {
  //   const roundData = roundDoc.data()

  //   // Convert job references to job data
  //   const jobs = []
  //   for (const jobRef of roundData.jobs) {
  //     const jobSnapshot = await getDoc(jobRef)
  //     jobs.push(jobSnapshot.data())
  //   }

  //   rounds.push({
  //     ...roundData,
  //     jobs,
  //   })
  // }

  const rounds = []
  for (const roundDoc of roundDocsSnapshot.docs) {
    const roundData = roundDoc.data()

    // Convert job references to job data
    const jobs = []
    for (const jobRef of roundData.jobs) {
      try {
        const jobSnapshot = await getDoc(jobRef)
        jobs.push(jobSnapshot.data())
      } catch (error) {
        console.error('Error fetching job data:', error)
        console.log('Job reference:', jobRef)
      }
    }

    rounds.push({
      ...roundData,
      jobs,
    })
  }

  console.log('Rounds retrieved:', roundDocsSnapshot)
  return roundDocsSnapshot
}
