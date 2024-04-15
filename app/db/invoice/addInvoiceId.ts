import { doc, runTransaction, setDoc } from '@firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'

export const addInvoiceId = async () => {
  if (auth.currentUser === null) {
    return authError({ filename: 'addInvoiceId' })
  }

  try {
    // Get a reference to the counter document
    const counterDocRef = doc(
      db,
      'users',
      auth.currentUser.uid,
      'invoiceCounter',
      'counter',
    )

    // Run a transaction to increment the counter and use it as the new invoice number
    const newInvoiceId = await runTransaction(db, async (transaction) => {
      let counterDoc = await transaction.get(counterDocRef)

      //initialize the counter if it doesn't exist
      if (!counterDoc.exists()) {
        await setDoc(counterDocRef, { count: 0 })
        counterDoc = await transaction.get(counterDocRef)
      }

      // Get the current count
      counterDoc = await transaction.get(counterDocRef)

      // check if the counter document has any data
      const counterData = counterDoc.data()
      if (!counterData) {
        throw new Error('Counter document does not have any data!')
      }

      // Increment the count
      const newCount = 1000 + counterData.count + 1 // Start at 1001
      transaction.update(counterDocRef, { count: newCount })

      return newCount
    })

    return newInvoiceId
  } catch (error) {
    throw new Error(`Error adding invoice at addInvoiceId route: ${error}`)
  }
}
