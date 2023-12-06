import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../screens/stackNavigator/StackNavigator'

export const useFormResetOnBlur = (
  formik: any,
  setActiveStep: (value: React.SetStateAction<number>) => void,
) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // Reset the state here
      setActiveStep(0)
      formik.resetForm()
    })

    return unsubscribe
  }, [navigation, formik, setActiveStep])
}
