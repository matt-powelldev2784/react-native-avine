// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDX4rp66RgfpfYAdjclWgGC82R_1nT3JVA',
  authDomain: 'planme-d065c.firebaseapp.com',
  projectId: 'planme-d065c',
  storageBucket: 'planme-d065c.appspot.com',
  messagingSenderId: '182405791340',
  appId: '1:182405791340:web:42c851c4f02a8abb322249',
  measurementId: 'G-4ZJQ88DNNS',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
