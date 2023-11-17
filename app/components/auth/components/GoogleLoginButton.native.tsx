import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import React from 'react'

interface GoogleLoginButtonProps {
  signInFn: () => void
}

const GoogleLoginButton = ({ signInFn }: GoogleLoginButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => signInFn()}>
      <Image
        style={styles.image}
        source={require('../../../../assets/google_g.png')} /// replace with the path to your logo
      />
      <Text style={styles.buttonText}>Sign In With Google</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
  },

  button: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default GoogleLoginButton
