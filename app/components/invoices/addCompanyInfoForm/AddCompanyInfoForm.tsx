import React, { useState } from 'react'
import { View, Image, ScrollView, StyleSheet } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import { uploadCompanyLogo } from '../../../db/user/uploadCompanyLogo'
import { getCompanyLogo } from '../../../db/user/getCompanyLogo'
import useFormikSteps from './hooks/useFormikSteps'
import Button from '../../../ui/button/Button'
import { useMoveToNextStep } from './hooks/useMoveToNextStep'
import { useFormResetOnBlur } from '../../../utils/useFormResetOnBlur'
import { useDeviceType } from '../../../utils/deviceTypes'
import { handleFormStepBack } from '../../../utils/handleFormStepBack'
import FormFlowTitles from './components/FormFlowTitles'
import InputField from '../../../ui/formElements/InputField'
import theme from '../../../utils/theme/theme'

const AddCompanyInfoForm = () => {
  //state
  const [activeStep, setActiveStep] = useState(0)
  const [logoUrl, setLogoUrl] = useState(null)

  //hooks
  const { postApiIsLoading, formik } = useFormikSteps({
    activeStep,
  })
  const { moveToNextStep } = useMoveToNextStep({
    formik,
    setActiveStep,
  })
  const { isLargeWeb } = useDeviceType()
  useFormResetOnBlur(formik, setActiveStep)

  //functions
  const handleStepBack = () => {
    handleFormStepBack({ setActiveStep, activeStep })
  }
  const handleSumbmitPress = () => {
    formik.handleSubmit()
  }

  //variables
  const buttonsStyle = isLargeWeb ? 'row' : 'column'

  // useEffect(() => {
  //   const fetchLogoUrl = async () => {
  //     const url = await getCompanyLogo()
  //     console.log('url', url)
  //     setLogoUrl(url)
  //   }

  //   fetchLogoUrl()
  // }, [logoUrl])

  const selectOneFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: 'image/jpeg', // Allowing only jpg images
      })
      if (!res.canceled) {
        await uploadCompanyLogo(res.assets[0].uri)
        const url = await getCompanyLogo()
        setLogoUrl(url)
      }
    } catch (error) {
      console.error('File selection error: ', error)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.wrapper}
    >
      <FormFlowTitles activeStep={activeStep} />

      <View style={styles.formContainer}>
        {/*********************  Step 1 ***************************/}

        {activeStep === 0 ? (
          <>
            <InputField
              formik={formik}
              name="companyName"
              placeholder="Company Name"
              title="Contact Name"
              imageName={'person'}
            />
            <InputField
              formik={formik}
              name="address"
              placeholder="Address"
              title="Address"
              imageName={'location'}
            />
            <InputField
              formik={formik}
              name="town"
              placeholder="Town"
              title="Town"
              imageName={'location'}
            />
            <InputField
              formik={formik}
              name="county"
              placeholder="County"
              title="County"
              imageName={'location'}
            />
            <InputField
              formik={formik}
              name="postcode"
              placeholder="Post Code"
              title="Post Code"
              imageName={'locationCircle'}
            />
            <InputField
              formik={formik}
              name="contactTel"
              placeholder="Contact Telephone Number"
              title="Contact Telephone Number"
              keyboardType={'phone-pad'}
              imageName={'tel'}
            />
          </>
        ) : null}
      </View>

      {/*********************  Step 2 ***************************/}
      {activeStep === 1 ? (
        <View style={styles.buttonContainer}>
          <Button
            text="Select Image"
            onPress={selectOneFile}
            isLoading={postApiIsLoading}
          />
          {logoUrl && (
            <Image
              source={{ uri: logoUrl }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
      ) : null}

      {/*********************  buttons ***************************/}
      <View style={styles.buttonContainer}>
        <View style={[styles.buttonContainer, { flexDirection: buttonsStyle }]}>
          {activeStep > 0 ? (
            <Button
              onPress={handleStepBack}
              text="Go Back"
              backgroundColor={theme.colors.buttonSecondary}
            />
          ) : null}

          {activeStep >= 0 && activeStep < 1 ? (
            <Button onPress={moveToNextStep} text="Next" />
          ) : null}

          {activeStep === 1 ? (
            <Button
              onPress={handleSumbmitPress}
              text="Add Company Infomation"
              isLoading={postApiIsLoading}
            />
          ) : null}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  wrapper: {
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 16,
  },
  formContainer: {
    width: '90%',
    maxWidth: 600,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    backgroundColor: 'white',
  },
  buttonContainer: {
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
  text: {
    fontSize: 14,
    color: theme.colors.primary,
  },
})

export default AddCompanyInfoForm
