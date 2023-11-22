import React from 'react'
import { TextInput, Text, StyleSheet } from 'react-native'
import { FormikProps } from 'formik'

interface InputFieldProps {
  formik: FormikProps<any>
  name: string
  placeholder: string
  numericInput?: boolean
}

const InputField: React.FC<InputFieldProps> = ({
  formik,
  name,
  placeholder,
  numericInput,
}) => {
  return (
    <>
      <TextInput
        onChangeText={formik.handleChange(name)}
        onBlur={formik.handleBlur(name)}
        value={formik.values[name]}
        placeholder={placeholder}
        style={[
          formik.touched[name] && formik.errors[name]
            ? styles.errorInput
            : styles.input,
        ]}
        keyboardType={numericInput ? 'numeric' : 'default'}
      />
      {formik.touched[name] && formik.errors[name] ? (
        <Text style={styles.errorText}>{String(formik.errors[name])}</Text>
      ) : (
        <Text style={styles.errorPlaceholder}>
          {String(formik.errors[name])}
        </Text>
      )}
    </>
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
    borderWidth: 2,
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  errorInput: {
    height: 40,
    borderColor: 'red',
    borderWidth: 2,
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 12,
  },
  errorPlaceholder: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
    opacity: 0,
    fontSize: 12,
  },
})

export default InputField
