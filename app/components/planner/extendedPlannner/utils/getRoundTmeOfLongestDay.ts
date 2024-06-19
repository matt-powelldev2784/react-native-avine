import { ExtendedPlannerRoundsDataT } from '../../../../types/RoundT'

export const getRoundTimeOfLongestDay = (
  roundData: ExtendedPlannerRoundsDataT[],
) => {
  let maxRoundTime = 0

  roundData.forEach((day) => {
    let totalRoundTime = 0

    day.rounds.forEach((round) => {
      const roundTime = round.relatedJobs?.reduce(
        (acc, job) => acc + Number(job.time),
        0,
      )
      totalRoundTime += roundTime
    })

    if (totalRoundTime > maxRoundTime) {
      maxRoundTime = totalRoundTime
    }
  })

  return maxRoundTime
}
