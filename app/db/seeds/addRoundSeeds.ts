import { auth } from '../../../firebaseConfig'
import { authError } from '../authError'
import { addRound } from '../rounds/addRound'

export const addRoundSeeds = async () => {
  if (!auth.currentUser) {
    return authError({ filename: 'addClientSaddRoundSeedseeds' })
  }

  const seedData = {
    roundName: 'Round Seed',
    location: 'Location Seed',
    frequency: '52 Weekly',
    relatedJobs: ['VGtIVpTyrYbxmKSYpTrv', '3grKkplQ5bGUioRBhfXs'],
  }

  try {
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)

    //
  } catch (error) {
    throw new Error(
      `Error adding cleint to db at addRoundSeeds route: ${error}`,
    )
  }
}
