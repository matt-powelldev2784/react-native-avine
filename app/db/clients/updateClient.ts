import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'
import { ClientWithIdT } from '../../types/ClientT'
import { splitStringToLowerCaseArray } from '../../utils/splitStringToLowerCaseArray'

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
      companyName: clientData.companyName,
      address: clientData.address,
      town: clientData.town,
      county: clientData.county,
      postcode: clientData.postcode,
      contactTel: clientData.contactTel,
      notes: clientData.notes,
      isDeleted: clientData.isDeleted,
      _searchName: splitStringToLowerCaseArray(clientData.name),
      _searchCompanyName: splitStringToLowerCaseArray(
        clientData.companyName || '',
      ),
      _searchAddress: splitStringToLowerCaseArray(clientData.address),
      _searchTown: splitStringToLowerCaseArray(clientData.town),
      _searchPostcode: splitStringToLowerCaseArray(clientData.postcode),
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
