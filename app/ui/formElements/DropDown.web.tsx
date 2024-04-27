import React from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import { FormikProps } from 'formik'
import Select from 'react-dropdown-select'
import { inputIcons } from './inputIcons'
import theme from '../../utils/theme/theme'

interface DropdownProps {
  formik: FormikProps<any>
  name: string
  placeholder: string
  title: string
  options: { label: string; value: string | boolean }[]
  imageName: keyof typeof inputIcons
}

const Dropdown = ({
  formik,
  name,
  placeholder,
  title,
  options,
  imageName,
}: DropdownProps) => {
  const handleChange = (option: any) => {
    if (option) {
      formik.setFieldValue(name, option[0].value)
    }
  }

  const selectedOption = options.find(
    (option) => option.value === formik.values[name],
  )

  return (
    <View style={styles.container}>
      <Image source={inputIcons[imageName]} style={styles.image} />
      <Text style={styles.label}>{title.toUpperCase()}</Text>

      <Select
        options={options}
        values={selectedOption ? [selectedOption] : []}
        placeholder={placeholder}
        onChange={handleChange}
        style={{
          borderColor:
            formik.touched[name] && formik.errors[name]
              ? 'red'
              : theme.colors.primary,
          borderWidth: 2,
          borderRadius: 8,
          paddingLeft: 36,
          backgroundColor: 'white',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
        contentRenderer={({ props, state, methods }) => {
          const isEmpty = !state.values.length
          const { placeholder } = props
          return (
            <div
              style={{
                fontSize: isEmpty ? 16 : undefined,
                color: isEmpty ? '#828585' : '#000000',
              }}
            >
              {isEmpty ? placeholder : state.values[0].label}
            </div>
          )
        }}
      />

      {formik.touched[name] && formik.errors[name] ? (
        <Text style={styles.errorText}>{String(formik.errors[name])}</Text>
      ) : (
        <Text style={styles.errorPlaceholder}>
          {String(formik.errors[name])}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
    marginTop: 8,
    width: '100%',
  },
  label: {
    position: 'absolute',
    fontSize: Platform.OS === 'web' ? 16 : 16,
    marginBottom: 5,
    top: Platform.OS === 'web' ? -22 : -20,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  placeHolder: {
    fontSize: 16,
    color: '#828585',
  },
  image: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: 9.5,
    left: 10,
    zIndex: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 12,
  },
  errorPlaceholder: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
    opacity: 0,
    fontSize: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'red',
  },
})

export default Dropdown
