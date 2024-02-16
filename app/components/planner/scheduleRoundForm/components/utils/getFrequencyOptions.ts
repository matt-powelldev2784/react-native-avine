import { RoundWithIdT } from '../../../../../types/RoundT'
import { freqencyArray } from '../../../../../utils/freqencyArray'

export const getFrequencyOptions = (round: RoundWithIdT | null) => {
  const roundFrequency = round?.frequency
  const matchingItem = freqencyArray.find(
    (item) => item.value === roundFrequency,
  )
  const frequencyLabel = matchingItem?.label

  const frequencyOptions = [
    {
      label: `${frequencyLabel} recurring round`,
      value: true,
    },
    { label: 'One off clean', value: false },
  ]
  return frequencyOptions
}
