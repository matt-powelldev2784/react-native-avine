import { doc, setDoc, collection, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { ClientT } from '../../types/ClientT'
import { authError } from '../authError'

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
      address: clientInfo.address,
      town: clientInfo.town,
      postcode: clientInfo.postcode,
      contactTel: clientInfo.contactTel,
      notes: clientInfo.notes,
      isDeleted: false,
      _searchName: clientInfo.name.toLowerCase(),
      _searchAddress: clientInfo.address.toLowerCase(),
      _searchTown: clientInfo.town.toLowerCase(),
      _searchPostcode: clientInfo.postcode.toLowerCase(),
    })
    const client = await getDoc(clientDoc)

    return { id: client.id, ...client.data() }
  } catch (error) {
    throw new Error(`Error adding cleint to db at addClient route: ${error}`)
  }
}
