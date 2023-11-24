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

const images = {
  person: require('../../../../../assets/person.png'),
  location: require('../../../../../assets/location.png'),
  locationCircle: require('../../../../../assets/location_circle.png'),
  diamond: require('../../../../../assets/diamond.png'),
  clock: require('../../../../../assets/clock.png'),
  poundSign: require('../../../../../assets/pound_sign.png'),
  calender: require('../../../../../assets/calender.png'),
}

interface InputFieldProps {
  formik: FormikProps<any>
  name: string
  placeholder: string
  numericInput?: boolean
  imageName: keyof typeof images
}

const InputField: React.FC<InputFieldProps> = ({
  formik,
  name,
  placeholder,
  numericInput,
  imageName,
}) => {
  return (
    <View style={styles.container}>
      <Image source={images[imageName]} style={styles.image} />

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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    position: 'absolute',
    width: Platform.OS === 'web' ? 24 : 20,
    height: Platform.OS === 'web' ? 24 : 20,
    top: Platform.OS === 'web' ? 8 : 9.5,
    left: 10,
  },
  input: {
    height: 40,
    borderColor: '#337bae',
    borderWidth: 2,
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 36,
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
