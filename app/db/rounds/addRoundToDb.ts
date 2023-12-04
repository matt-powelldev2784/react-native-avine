import { doc, setDoc, collection, DocumentReference } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { RoundDbT } from '../../../types/RoundT' // You should define this type according to your needs

export const addRoundToDb = async (roundData: RoundDbT) => {
  if (auth.currentUser === null) {
    return
  }

  const userDoc = doc(db, 'users', auth.currentUser.uid)

  const roundsCollection = collection(userDoc, 'rounds')
  const roundDoc = doc(roundsCollection)

  // Convert job IDs to document references
  const jobRefs: DocumentReference[] = roundData.jobs.map((jobId) =>
    doc(db, 'jobs', jobId),
  )

  // Add the round with job references to the database
  await setDoc(roundDoc, {
    ...roundData,
    jobs: jobRefs,
  })

  console.log('New round added with ID:', roundDoc.id)
}

// Example usage:
// Assuming you have an array of job IDs and other round details
const roundData: RoundDbT = {
  name: 'Morning Round',
  place: 'Kingswood',
  frequency: 'Daily',
  jobs: ['QnjcwQZIj8409ljfjT2K', 'anotherJobId'], // Replace with actual job IDs
}

addRoundToDb(roundData)
