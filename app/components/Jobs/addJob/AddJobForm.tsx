import React from 'react'
import { Button, TextInput, View, Text, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'

// Define validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  postcode: Yup.string().required('Required'),
  jobType: Yup.string().required('Required'),
  time: Yup.number().required('Required').positive(),
  price: Yup.number().required('Required').positive(),
  frequency: Yup.string().required('Required'),
})

const AddJobForm = () => (
  <Formik
    initialValues={{
      name: '',
      address: '',
      postcode: '',
      jobType: '',
      time: 0,
      price: 0,
      frequency: '',
    }}
    onSubmit={(values) => console.log(values)}
    validationSchema={validationSchema}
  >
    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          value={values.name}
          placeholder="Name"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        <TextInput
          style={styles.input}
          onChangeText={handleChange('address')}
          onBlur={handleBlur('address')}
          value={values.address}
          placeholder="Address"
        />
        {errors.address && (
          <Text style={styles.errorText}>{errors.address}</Text>
        )}
        <TextInput
          style={styles.input}
          onChangeText={handleChange('postcode')}
          onBlur={handleBlur('postcode')}
          value={values.postcode}
          placeholder="Postcode"
        />
        {errors.postcode && (
          <Text style={styles.errorText}>{errors.postcode}</Text>
        )}
        <TextInput
          style={styles.input}
          onChangeText={handleChange('jobType')}
          onBlur={handleBlur('jobType')}
          value={values.jobType}
          placeholder="Job Type"
        />
        {errors.jobType && (
          <Text style={styles.errorText}>{errors.jobType}</Text>
        )}
        <TextInput
          style={styles.input}
          onChangeText={handleChange('time')}
          onBlur={handleBlur('time')}
          value={values.time.toString()}
          placeholder="Time"
          keyboardType="numeric"
        />
        {errors.time && <Text style={styles.errorText}>{errors.time}</Text>}
        <TextInput
          style={styles.input}
          onChangeText={handleChange('price')}
          onBlur={handleBlur('price')}
          value={values.price.toString()}
          placeholder="Price"
          keyboardType="numeric"
        />
        {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
        <TextInput
          style={styles.input}
          onChangeText={handleChange('frequency')}
          onBlur={handleBlur('frequency')}
          value={values.frequency}
          placeholder="Frequency"
        />
        {errors.frequency && (
          <Text style={styles.errorText}>{errors.frequency}</Text>
        )}
        {/* @ts-expect-error due to react native not having form element */}
        <Button onPress={handleSubmit} title="Submit" color="#337bae" />
      </View>
    )}
  </Formik>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: '#337bae',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  errorText: {
    color: 'red',
  },
})

export default AddJobForm
