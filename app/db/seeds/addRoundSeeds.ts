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
    relatedJobs: ['07PHUY2BJSM2oXwfyCEN', '1UUtWbLdlzFnN7eYkd28'],
  }

  const seedData2 = {
    roundName: 'Round Seed',
    location: 'Location Seed',
    frequency: '52 Weekly',
    relatedJobs: ['07PHUY2BJSM2oXwfyCEN', '1UUtWbLdlzFnN7eYkd28'],
  }

  try {
    await addRound(seedData)
    await addRound(seedData2)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData2)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData)
    await addRound(seedData2)
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
