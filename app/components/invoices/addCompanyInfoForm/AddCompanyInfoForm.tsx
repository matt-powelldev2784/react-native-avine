import React, { useState } from 'react'
import { View, ScrollView, StyleSheet, Text } from 'react-native'
import useFormikSteps from './hooks/useFormikSteps'
import Button from '../../../ui/button/Button'
import { useMoveToNextStep } from './hooks/useMoveToNextStep'
import { useFormResetOnBlur } from '../../../utils/useFormResetOnBlur'
import { useDeviceType } from '../../../utils/deviceTypes'
import { handleFormStepBack } from '../../../utils/handleFormStepBack'
import FormFlowTitles from './components/FormFlowTitles'
import InputField from '../../../ui/formElements/InputField'
import theme from '../../../utils/theme/theme'
import { useUploadImage } from './hooks/useUploadImage'
import DataSwitchItem from './components/DataSwitchItem'
import ImageSelector from './components/ImageSelector'
import ImagePreview from './components/ImagePreview'
import { removeLogoPreview } from '../../../db/user/removeLogoPreview'

const AddCompanyInfoForm = () => {
  //state
  const [activeStep, setActiveStep] = useState(0)
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
    uploadImageIsLoading,
    handleSelectImage,
    uploadImageError,
    uploadImageSuccess,
  } = useUploadImage()

  const handleChangeImage = async () => {
    await removeLogoPreview()
    await handleSelectImage()
  }

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

      <Text style={styles.textInfo}>
        Add your company details here. They will appear on the pdf invoices
        which will be generated for you.
      </Text>

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
          <View style={styles.step2Container}>
            {!logoUploadDeclined ? (
              <>
                <ImageSelector
                  onPress={handleChangeImage}
                  isLoading={uploadImageIsLoading}
                />
                <ImagePreview
                  refreshImage={uploadImageSuccess}
                  formik={formik}
                />
              </>
            ) : null}

            {uploadImageError ? (
              <Text style={styles.errorText}>
                Error uploading image. Please try again.
              </Text>
            ) : null}

            <DataSwitchItem
              name={'Skip logo upload'}
              value={logoUploadDeclined}
              onTogglePress={toggleDeclineLogoUpload}
              infoText={
                'The logo will be used at the top of the your invoices. If you choose to skip, text will be used instead.'
              }
            />
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
  textInfo: {
    fontSize: 14,
    color: theme.colors.primary,
    textAlign: 'center',
    paddingHorizontal: 16,
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
  step2Container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    overflow: 'hidden',
  },
  imageUploadContainer: {
    width: '100%',
  },
  imageUploadContainerUploading: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'red',
  },
  logoPreviewContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: 285,
    height: 150,
    backgroundColor: theme.colors.backgroundGrey,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 285,
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
  toggleLabel: { flexDirection: 'row', alignItems: 'center', gap: 8 },
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
