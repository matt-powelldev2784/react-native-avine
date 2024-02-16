import { View, StyleSheet } from 'react-native'
import React from 'react'
import theme from '../../../../utils/theme/theme'
import { useDeviceType } from '../../../../utils/deviceTypes'
import Button from '../../../../ui/button/Button'
import { useMoveToNextStep } from '../hooks/useMoveToNextStep'

interface FormButtonsProps {
  activeStep: number
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
  setRecurringRoundExistsMessage: React.Dispatch<React.SetStateAction<boolean>>
  formik: any
  isLoading: boolean
}

const FormButtons = ({
  activeStep,
  setActiveStep,
  setRecurringRoundExistsMessage,
  formik,
  isLoading,
}: FormButtonsProps) => {
  const { isLargeWeb } = useDeviceType()

  const handleFormikSubmit = () => {
    formik.handleSubmit()
  }

  const handleStepBack = () => {
    if (activeStep === 0) {
      return
    }
    setActiveStep((prev) => prev - 1)
  }

  const moveToNextStep = useMoveToNextStep({
    formik,
    setActiveStep,
    activeStep,
    setRecurringRoundExistsMessage,
  })

  const containerStyle = isLargeWeb ? 'row' : 'column'

  return (
    <View style={styles.container}>
      {activeStep < 2 ? (
        <View style={[styles.container, { flexDirection: containerStyle }]}>
          <Button
            onPress={handleStepBack}
            text={'Go Back'}
            backgroundColor={theme.colors.buttonSecondary}
          />

          <Button onPress={moveToNextStep} text={'Next'} />
        </View>
      ) : null}

      {activeStep === 2 ? (
        <View style={[styles.container, { flexDirection: containerStyle }]}>
          <Button
            onPress={handleStepBack}
            text={'Go Back'}
            backgroundColor={theme.colors.buttonSecondary}
          />

          <Button
            onPress={handleFormikSubmit}
            text={'Add Round To Planner'}
            isLoading={isLoading}
          />
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 600,
    gap: 8,
  },
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    maxWidth: 270,
  },
  buttonSecondary: {
    alignItems: 'center',
    backgroundColor: theme.colors.buttonSecondary,
    padding: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    maxWidth: 270,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default FormButtons
