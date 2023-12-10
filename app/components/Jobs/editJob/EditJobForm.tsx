import React, { useState } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native'
import useFormikSteps from './hooks/useFormikSteps'
import InputField from '../../../ui/formElements/InputField'
import Dropdown from '../../../ui/formElements/DropDown'
import FormFlowTitles from './components/FormFlowTitles'
import { useMoveToNextStep } from './hooks/useMoveToNextStep'
import { useRoute } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../screens/stackNavigator/StackNavigator'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import theme from '../../../utils/theme/theme'
import { freqencyArray } from '../../../utils/freqencyArray'

type EditJobFormRouteProp = RouteProp<RootStackParamList, 'EditJob'>

const EditJobForm = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const route = useRoute<EditJobFormRouteProp>()
  const [activeStep, setActiveStep] = useState(0)

  const jobId = route?.params?.jobId ? route?.params?.jobId : ''
  const formik = useFormikSteps({
    activeStep,
    jobId,
  })
  const { moveToNextStep } = useMoveToNextStep({ formik, setActiveStep })

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
              name="jobName"
              placeholder="Job Name"
              title="Job Name"
              imageName={'wiper'}
            />
            <InputField
              formik={formik}
              name="address"
              placeholder="Address"
              title="Job Address"
              imageName={'location'}
            />
            <InputField
              formik={formik}
              name="postcode"
              placeholder="Post Code"
              title="Post Code"
              imageName={'locationCircle'}
            />
          </>
        ) : null}

        {/*********************  Step 2 ***************************/}
        {activeStep === 1 ? (
          <>
            <InputField
              formik={formik}
              name="contactName"
              placeholder="Contact Name"
              title="Contact Name"
              imageName={'person'}
            />
            <InputField
              formik={formik}
              name="contactTel"
              placeholder="Contact Telephone Number"
              title="Contact Telephone Number"
              numericInput={true}
              imageName={'tel'}
            />
          </>
        ) : null}

        {/*********************  Step 3 ***************************/}
        {activeStep === 2 ? (
          <>
            <InputField
              formik={formik}
              name="jobType"
              placeholder="Job Type e.g Front Only"
              title="Job Type"
              imageName={'diamond'}
            />
            <InputField
              formik={formik}
              name="time"
              placeholder="Estimated Job Time In Hours e.g 1.5"
              title="Estimated Job Time"
              numericInput={true}
              imageName={'clock'}
            />
            <InputField
              formik={formik}
              name="price"
              placeholder="Price"
              title="Price"
              numericInput={true}
              imageName={'poundSign'}
            />
            <Dropdown
              formik={formik}
              name="frequency"
              placeholder="Cleaning Frequency"
              title="Cleaning Frequency"
              options={freqencyArray}
              imageName={'calender'}
            />
            <InputField
              formik={formik}
              name="notes"
              placeholder="Notes"
              title="Notes"
              numericInput={true}
              imageName={'notes'}
            />
          </>
        ) : null}

        <View style={styles.buttonContainer}>
          {activeStep < 2 ? (
            <>
              <TouchableOpacity onPress={moveToNextStep} style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </>
          ) : null}

          {activeStep === 2 ? (
            <TouchableOpacity
              onPress={() => {
                formik.handleSubmit()

                if (formik.isValid) {
                  setActiveStep(0)
                  navigation.navigate('Jobs', { refresh: true })
                }
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Update Job</Text>
            </TouchableOpacity>
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
    paddingBottom: 80,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    maxWidth: 600,
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default EditJobForm
