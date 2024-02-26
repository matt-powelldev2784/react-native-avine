interface handleFormStepBackProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
  activeStep: number
}

export const handleFormStepBack = ({
  setActiveStep,
  activeStep,
}: handleFormStepBackProps) => {
  if (activeStep === 0) {
    return
  }
  setActiveStep((prev) => prev - 1)
}
