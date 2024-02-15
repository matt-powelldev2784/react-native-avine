import React from 'react'
import {
  TextInput,
  Text,
  StyleSheet,
  View,
  Image,
  Platform,
} from 'react-native'
import { FormikProps } from 'formik'
import { inputIcons } from './inputIcons'
import theme from '../../utils/theme/theme'
import { KeyboardTypeOptions } from 'react-native'

interface InputFieldProps {
  formik: FormikProps<any>
  name: string
  placeholder: string
  title: string
  keyboardType?: KeyboardTypeOptions
  imageName: keyof typeof inputIcons
}

const InputField: React.FC<InputFieldProps> = ({
  formik,
  name,
  placeholder,
  title,
  keyboardType,
  imageName,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title.toUpperCase()}</Text>
      <Image source={inputIcons[imageName]} style={styles.image} />

      <TextInput
        onChangeText={formik.handleChange(name)}
        onBlur={formik.handleBlur(name)}
        value={formik.values[name]}
        placeholder={placeholder}
        placeholderTextColor={Platform.OS === 'web' ? '#828585' : '#bfbfbf'}
        style={[
          formik.touched[name] && formik.errors[name]
            ? styles.errorInput
            : styles.input,
        ]}
        keyboardType={keyboardType !== undefined ? keyboardType : 'default'}
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
  image: {
    position: 'absolute',
    width: Platform.OS === 'web' ? 24 : 20,
    height: Platform.OS === 'web' ? 24 : 20,
    top: Platform.OS === 'web' ? 8 : 9.5,
    left: 10,
    zIndex: 10,
  },
  input: {
    height: 40,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: Platform.OS === 'web' ? 40 : 36,
    color: 'black',
    backgroundColor: 'white',
  },
  errorInput: {
    height: 40,
    borderColor: 'red',
    borderWidth: 2,
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: Platform.OS === 'web' ? 40 : 36,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 12,
  },
  errorPlaceholder: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
    opacity: 0,
    fontSize: 12,
  },
})

export default InputField
