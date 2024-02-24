import { useFormik } from 'formik'
import * as Yup from 'yup'
import { updateRound } from '../../../../db/rounds/updateRound'
import { useEffect, useState } from 'react'
import { RoundWithRelatedJobIdsT } from '../../../../types/RoundT'
import { getRound } from '../../../../db/rounds/getRound'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'

export const stepOneSchema = Yup.object().shape({
  roundName: Yup.string().required('Round Name is required'),
  location: Yup.string().required('Location is required'),
  frequency: Yup.string().required('Frequency is required'),
})

export const stepTwoSchema = Yup.object().shape({
  jobs: Yup.array().of(Yup.string().required('Job ID is required')),
})

interface useFormikStepsInterface {
  activeStep: number
  roundId: string
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const useFormikSteps = ({
  activeStep,
  roundId,
  setIsLoading,
}: useFormikStepsInterface) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [roundData, setRoundData] = useState<RoundWithRelatedJobIdsT>({
    id: '',
    roundName: '',
    location: '',
    frequency: '',
    relatedJobs: [],
    isDeleted: false,
  })

  let validationSchema

  useEffect(() => {
    const handleRoundData = async (roundId: string) => {
      const roundData = await getRound(roundId)

      if (roundData) {
        setRoundData({
          ...roundData,
          relatedJobs: roundData.relatedJobs,
        })
      }
    }

    handleRoundData(roundId)
  }, [roundId])

  if (activeStep === 0) {
    validationSchema = stepOneSchema
  } else if (activeStep === 1) {
    validationSchema = stepTwoSchema
  }

  const formik = useFormik({
    initialValues: roundData,
    onSubmit: async (values) => {
      setIsLoading(true)

      await updateRound(values)

      setIsLoading(false)

      navigation.navigate('Rounds', { refresh: true })
    },
    validationSchema,
    enableReinitialize: true,
  })

  return formik
}

export default useFormikSteps
