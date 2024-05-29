import { auth } from '../../../firebaseConfig'
import { authError } from '../authError'
import { addClient } from '../clients/addCleint'

export const addClientSeeds = async () => {
  if (!auth.currentUser) {
    return authError({ filename: 'addClientSeeds' })
  }

  const seedData = {
    name: 'Name Seed',
    companyName: 'Company Seed',
    address: 'Add Seed',
    town: 'Town Seed',
    county: 'County Seed',
    postcode: 'Post Code Seed',
    contactTel: '123',
    notes: '1',
    isDeleted: false,
  }

  try {
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    await addClient(seedData)
    //
  } catch (error) {
    throw new Error(
      `Error adding cleint to db at addClientSeeds route: ${error}`,
    )
  }
}
