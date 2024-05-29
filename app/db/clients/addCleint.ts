import { doc, setDoc, collection, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { ClientT } from '../../types/ClientT'
import { authError } from '../authError'
import { splitStringToLowerCaseArray } from '../../utils/splitStringToLowerCaseArray'

export const addClient = async (clientInfo: ClientT) => {
  if (!auth.currentUser) {
    return authError({ filename: 'addClient' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)

    const clientsCollection = collection(userDoc, 'clients')
    const clientDoc = doc(clientsCollection)

    await setDoc(clientDoc, {
      name: clientInfo.name,
      companyName: clientInfo.companyName,
      address: clientInfo.address,
      town: clientInfo.town,
      county: clientInfo.county,
      postcode: clientInfo.postcode,
      contactTel: clientInfo.contactTel,
      notes: clientInfo.notes,
      isDeleted: false,
      _searchName: splitStringToLowerCaseArray(clientInfo.name),
      _searchCompanyName: splitStringToLowerCaseArray(
        clientInfo.companyName || '',
      ),
      _searchAddress: splitStringToLowerCaseArray(clientInfo.address),
      _searchTown: splitStringToLowerCaseArray(clientInfo.town),
      _searchPostcode: splitStringToLowerCaseArray(clientInfo.postcode),
    })
    const client = await getDoc(clientDoc)

    return { id: client.id, ...client.data() }
  } catch (error) {
    throw new Error(`Error adding cleint to db at addClient route: ${error}`)
  }
}
