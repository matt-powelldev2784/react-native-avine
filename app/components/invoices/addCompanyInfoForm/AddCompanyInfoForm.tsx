import React, { useState } from 'react'
import { View, Image, ScrollView, StyleSheet, Text } from 'react-native'
import useFormikSteps from './hooks/useFormikSteps'
import Button from '../../../ui/button/Button'
import { useMoveToNextStep } from './hooks/useMoveToNextStep'
import { useFormResetOnBlur } from '../../../utils/useFormResetOnBlur'
import { useDeviceType } from '../../../utils/deviceTypes'
import { handleFormStepBack } from '../../../utils/handleFormStepBack'
import FormFlowTitles from './components/FormFlowTitles'
import InputField from '../../../ui/formElements/InputField'
import theme from '../../../utils/theme/theme'
import CustomButton from '../../../ui/button/CustomButton'
import { useSelectImage } from './hooks/useSelectImage'
import { CustomSwitch } from '../../../ui'

const AddCompanyInfoForm = () => {
  //state
  const [activeStep, setActiveStep] = useState(1)
  const [logoUploadDeclined, setlogoUploadDeclined] = useState<boolean>(false)

  //hooks
  const { postApiIsLoading, formik } = useFormikSteps({
    activeStep,
  })
  const { moveToNextStep } = useMoveToNextStep({
    formik,
    setActiveStep,
  })
  const {
    logoUrl,
    setLogoUrl,
    uploadImageIsLoading,
    handleSelectImage,
    uploadImageError,
  } = useSelectImage({ formik })

  const { isLargeWeb } = useDeviceType()
  useFormResetOnBlur(formik, setActiveStep)

  //functions
  const handleStepBack = () => {
    handleFormStepBack({ setActiveStep, activeStep })
  }
  const handleSumbmitPress = async () => {
    formik.handleSubmit()
  }
  const toggleDeclineLogoUpload = () => {
    formik.setFieldValue('logoUploadDeclined', !logoUploadDeclined)

    if (logoUploadDeclined) {
      formik.setFieldValue('logoUrl', '')
    }
    if (!logoUploadDeclined) {
      formik.setFieldValue('logoUrl', 'null')
    }

    setLogoUrl(null)
    setlogoUploadDeclined((prev) => !prev)
  }

  //variables
  const buttonsStyle = isLargeWeb ? 'row' : 'column'

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

        {/*********************  Step 2 ***************************/}
        {activeStep === 1 ? (
          <View
            style={
              uploadImageIsLoading
                ? styles.imageUploadContainer
                : styles.imageUploadContainerUploading
            }
          >
            {logoUploadDeclined ? null : (
              <CustomButton
                onPress={handleSelectImage}
                isLoading={uploadImageIsLoading}
              >
                {logoUrl && !uploadImageError ? (
                  <View style={styles.logoContainer}>
                    <Image
                      source={{ uri: logoUrl }}
                      style={styles.logoPreview}
                      resizeMode="contain"
                    />
                  </View>
                ) : (
                  <View style={styles.logoPreviewContainer}>
                    <Image
                      source={require('../../../../assets/addImage.png')}
                      style={{
                        width: 40,
                        height: 40,
                      }}
                    />
                    <Text style={styles.logoPreviewText}>
                      Click here to upload a company logo
                    </Text>
                  </View>
                )}

                {uploadImageError ? (
                  <Text style={styles.errorText}>
                    Error uploading image, try again
                  </Text>
                ) : null}
              </CustomButton>
            )}

            <View style={styles.toggleContainer}>
              <Text style={styles.text}>Skip logo upload</Text>
              <CustomSwitch
                value={logoUploadDeclined}
                onValueChange={toggleDeclineLogoUpload}
              />
            </View>
          </View>
        ) : null}

        {/*********************  buttons ***************************/}
        <View style={styles.buttonContainer}>
          <View
            style={[styles.buttonContainer, { flexDirection: buttonsStyle }]}
          >
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
                text="Submit Company Info"
                isLoading={postApiIsLoading}
              />
            ) : null}
          </View>
        </View>
      </View>

      {!isLargeWeb ? <View style={{ height: 250 }} /> : null}
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
    paddingBottom: 80,
  },
  imageUploadContainer: {
    position: 'relative',
    width: '100%',
    backgroundColor: theme.colors.backgroundGrey,
  },
  imageUploadContainerUploading: {
    position: 'relative',
    width: '100%',
  },
  logoPreviewContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: 282,
    height: 150,
    backgroundColor: theme.colors.backgroundGrey,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 282,
    height: 150,
  },
  logoPreview: {
    width: '100%',
    height: '100%',
  },
  logoPreviewText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    paddingHorizontal: 48,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minWidth: 282,
    padding: 8,
    paddingHorizontal: 16,
    marginTop: 16,
    backgroundColor: theme.colors.formFlowSecondary,
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 600,
    gap: 8,
    marginTop: 16,
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
  errorText: {
    fontSize: 14,
    color: 'red',
  },
})

export default AddCompanyInfoForm
