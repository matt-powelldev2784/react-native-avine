import React, { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import useFormikSteps from './hooks/useFormikSteps'
import InputField from '../../../ui/formElements/InputField'
import FormFlowTitles from './components/FormFlowTitles'
import theme from '../../../utils/theme/theme'
import { useFormResetOnBlur } from '../../../utils/useFormResetOnBlur'
import { useDeviceType } from '../../../utils/hooks/useDeviceTypes'
import Button from '../../../ui/button/Button'
import { useRoute } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../screens/stackNavigator/StackNavigator'

type EditJobFormRouteProp = RouteProp<RootStackParamList, 'EditClient'>

const EditClientForm = () => {
  //state
  const [activeStep, setActiveStep] = useState(0)

  //hooks
  const route = useRoute<EditJobFormRouteProp>()
  const clientId = route?.params?.clientId ? route?.params?.clientId : ''
  const { postApiIsLoading, formik } = useFormikSteps({
    activeStep,
    clientId,
  })

  const { isLargeWeb } = useDeviceType()
  useFormResetOnBlur(formik, setActiveStep)

  //functions
  const handleSumbmitPress = () => {
    formik.handleSubmit()
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
        <InputField
          formik={formik}
          name="name"
          placeholder="Name"
          title="name"
          imageName={'person'}
        />
        <InputField
          formik={formik}
          name="companyName"
          placeholder="Company Name"
          title="companyName"
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
        <InputField
          formik={formik}
          name="notes"
          placeholder="Notes"
          title="Notes"
          imageName={'notes'}
        />

        {/*********************  buttons ***************************/}
        <View style={styles.buttonContainer}>
          <View
            style={[styles.buttonContainer, { flexDirection: buttonsStyle }]}
          >
            <Button
              onPress={handleSumbmitPress}
              text="Update Client"
              isLoading={postApiIsLoading}
            />
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
})

export default EditClientForm
