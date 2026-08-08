import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrJ-r50mYxtGytggG3yM5jQGnlQw_h-PA",
  authDomain: "careerforge-app-459a4.firebaseapp.com",
  projectId: "careerforge-app-459a4",
  storageBucket: "careerforge-app-459a4.firebasestorage.app",
  messagingSenderId: "614155525521",
  appId: "1:614155525521:web:7bf5528540380728208e30",
  measurementId: "G-98XBB4Y7VB"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)

// Google Login Helper
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    return result.user
  } catch (error) {
    console.error('Google Sign-in Error:', error)
    throw error
  }
}

// Logout Helper
export const logOut = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Logout Error:', error)
    throw error
  }
}

// Save Resume to Firestore Cloud
export const saveResumeToCloud = async (userId, candidateData) => {
  try {
    const userDocRef = doc(db, 'resumes', userId)
    await setDoc(userDocRef, {
      ...candidateData,
      updatedAt: serverTimestamp()
    }, { merge: true })
    return true
  } catch (error) {
    console.error('Error saving to cloud:', error)
    throw error
  }
}

// Load Resume from Firestore Cloud
export const loadResumeFromCloud = async (userId) => {
  try {
    const userDocRef = doc(db, 'resumes', userId)
    const docSnap = await getDoc(userDocRef)
    if (docSnap.exists()) {
      return docSnap.data()
    }
    return null
  } catch (error) {
    console.error('Error loading from cloud:', error)
    return null
  }
}

export default app
