import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'
import { ClientWithIdT } from '../../types/ClientT'

export const updateClient = async (clientData: ClientWithIdT) => {
  if (auth.currentUser === null) {
    return authError({ filename: 'updateClient' })
  }

console.log('clientData', clientData)

try {
  const clientDocRef = doc(
    db,
    'users',
    auth.currentUser.uid,
    'clients',
    clientData.id,
  )

  await updateDoc(clientDocRef, {
    name: clientData.name,
    address: clientData.address,
    town: clientData.town,
    postcode: clientData.postcode,
    contactTel: clientData.contactTel,
    notes: clientData.notes,
    isDeleted: clientData.isDeleted,
    _searchName: clientData.name.toLowerCase(),
    _searchAddress: clientData.address.toLowerCase(),
    _searchTown: clientData.town.toLowerCase(),
    _searchPostcode: clientData.postcode.toLowerCase(),
  })

  const updatedClient = await getDoc(clientDocRef)
  const updatedClientData = { id: updatedClient.id, ...updatedClient.data() }

  return updatedClientData
} catch (error) {
  throw new Error(
    `Error updating client detail at updateClient route: ${error}`,
  )
}
}
