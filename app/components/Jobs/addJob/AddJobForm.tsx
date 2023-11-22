import React from 'react'
import { Button, TextInput, View, Text, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const AddJobForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      postcode: '',
      jobType: '',
      time: 0,
      price: 0,
      frequency: '',
    },
    onSubmit: (values) => console.log(values),
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Required'),
      address: Yup.string().required('Required'),
      postcode: Yup.string().required('Required'),
      jobType: Yup.string().required('Required'),
      time: Yup.number().required('Required').positive(),
      price: Yup.number().required('Required').positive(),
      frequency: Yup.string().required('Required'),
    }),
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange('name')}
        onBlur={formik.handleBlur('name')}
        value={formik.values.name}
        placeholder="Name"
      />
      {formik.errors.name && formik.touched.name && (
        <Text style={styles.errorText}>{formik.errors.name}</Text>
      )}
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange('address')}
        onBlur={formik.handleBlur('address')}
        value={formik.values.address}
        placeholder="Address"
      />
      {formik.errors.address && formik.touched.address && (
        <Text style={styles.errorText}>{formik.errors.address}</Text>
      )}
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange('postcode')}
        onBlur={formik.handleBlur('postcode')}
        value={formik.values.postcode}
        placeholder="Postcode"
      />
      {formik.errors.postcode && formik.touched.postcode && (
        <Text style={styles.errorText}>{formik.errors.postcode}</Text>
      )}
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange('jobType')}
        onBlur={formik.handleBlur('jobType')}
        value={formik.values.jobType}
        placeholder="Job Type"
      />
      {formik.errors.jobType && formik.touched.jobType && (
        <Text style={styles.errorText}>{formik.errors.jobType}</Text>
      )}
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange('time')}
        onBlur={formik.handleBlur('time')}
        value={formik.values.time.toString()}
        placeholder="Time"
        keyboardType="numeric"
      />
      {formik.errors.time && formik.touched.time && (
        <Text style={styles.errorText}>{formik.errors.time}</Text>
      )}
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange('price')}
        onBlur={formik.handleBlur('price')}
        value={formik.values.price.toString()}
        placeholder="Price"
        keyboardType="numeric"
      />
      {formik.errors.price && formik.touched.price && (
        <Text style={styles.errorText}>{formik.errors.price}</Text>
      )}
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange('frequency')}
        onBlur={formik.handleBlur('frequency')}
        value={formik.values.frequency}
        placeholder="Frequency"
      />
      {formik.errors.frequency && formik.touched.frequency && (
        <Text style={styles.errorText}>{formik.errors.frequency}</Text>
      )}
      {/* @ts-expect-error due to react native not having form element */}
      <Button onPress={formik.handleSubmit} title="Submit" color="#337bae" />
    </View>
  )
}

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
