import { FormikProps } from 'formik'
import { getRoundById } from '../../../../db/rounds/getRoundById'
import { RoundWithIdT } from '../../../../types/RoundT'
import { checkIfRecurringRoundExists } from '../../../../db/planner/checkIfRecurringRoundExists'

interface UseMoveToNextStepProps {
  formik: FormikProps<any>
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
  activeStep: number
  setRecurringRoundExistsMessage: React.Dispatch<React.SetStateAction<boolean>>
}

export const useMoveToNextStep = ({
  formik,
  setActiveStep,
  activeStep,
  setRecurringRoundExistsMessage,
}: UseMoveToNextStepProps) => {
  const setFieldsAsTouched = () => {
    Object.keys(formik.values).forEach((key) => {
      formik.setFieldTouched(key)
    })
  }

  const moveToNextStep = async () => {
    const formIsValid = Object.keys(formik.errors).length === 0

    setFieldsAsTouched()

    if (formIsValid && activeStep === 0) {
      const round: RoundWithIdT | null = await getRoundById(
        formik.values.roundId,
      )
      formik.setFieldValue('roundFrequency', round?.frequency.toString())

      setActiveStep((prev) => prev + 1)
      formik.setTouched({})

      return moveToNextStep
    }

    const roundSetToRecur = formik.values.recurring

    if (formIsValid && activeStep === 1 && roundSetToRecur) {
      const checkForRecurringRound = await checkIfRecurringRoundExists({
        roundId: formik.values.roundId,
      })
      const recuringRoundExits =
        checkForRecurringRound?.recurringRoundExists || false

      setRecurringRoundExistsMessage(recuringRoundExits)

      formik.setTouched({})

      return moveToNextStep
    }

    if (formIsValid) {
      setActiveStep((prev) => prev + 1)
      formik.setTouched({})
    }
  }

  return moveToNextStep
}
