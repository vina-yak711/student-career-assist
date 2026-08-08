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

// Initialize Firebase App
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })
export const db = getFirestore(app)

// Google Login with clear error handling
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    return result.user
  } catch (error) {
    console.error('Google Sign-in Error:', error)
    if (error.code === 'auth/unauthorized-domain') {
      alert('⚠️ Firebase Authorized Domain Setup: Please add "client-rust-ten-69.vercel.app" in Firebase Console > Authentication > Settings > Authorized Domains.')
    } else if (error.code === 'auth/configuration-not-found') {
      alert('⚠️ Please enable Google Provider in Firebase Console > Authentication > Sign-in method > Google > Enable.')
    }
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

// Save Resume to Firestore Cloud + Local Storage Backup
export const saveResumeToCloud = async (userId, candidateData) => {
  try {
    // 1. Local backup
    localStorage.setItem(`vynkai_resume_${userId}`, JSON.stringify(candidateData))
    // 2. Firestore Cloud Save
    const userDocRef = doc(db, 'resumes', userId)
    await setDoc(userDocRef, {
      ...candidateData,
      updatedAt: serverTimestamp()
    }, { merge: true })
    return true
  } catch (error) {
    console.error('Error saving to cloud:', error)
    // Fallback to local storage
    localStorage.setItem(`vynkai_resume_${userId}`, JSON.stringify(candidateData))
    return true
  }
}

// Load Resume from Firestore Cloud or Local Storage Backup
export const loadResumeFromCloud = async (userId) => {
  try {
    const userDocRef = doc(db, 'resumes', userId)
    const docSnap = await getDoc(userDocRef)
    if (docSnap.exists()) {
      return docSnap.data()
    }
    // Fallback to local storage if Firestore is empty
    const local = localStorage.getItem(`vynkai_resume_${userId}`)
    return local ? JSON.parse(local) : null
  } catch (error) {
    console.error('Error loading from cloud:', error)
    const local = localStorage.getItem(`vynkai_resume_${userId}`)
    return local ? JSON.parse(local) : null
  }
}

export default app
