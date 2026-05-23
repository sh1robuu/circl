/**
 * Firebase Configuration & Initialization
 * Services: Auth, Analytics, Firestore (ready)
 */

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB7yHmmnk3VGfP0iq5UCKv_6W1TRcbjvgw',
  authDomain: 'circl-70247.firebaseapp.com',
  projectId: 'circl-70247',
  storageBucket: 'circl-70247.firebasestorage.app',
  messagingSenderId: '256037376692',
  appId: '1:256037376692:web:66ed80656255fa82bb7de1',
  measurementId: 'G-J03W4WNH75',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Set persistence to local (survives browser restart)
setPersistence(auth, browserLocalPersistence).catch(console.error);

export { app, analytics, auth, db };

// ===== Auth Functions =====

/**
 * Register a new user with email/password
 * Creates Firebase Auth user + Firestore profile document
 */
export async function registerUser({ email, password, name, role, childName, childAge }) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Update display name
  await updateProfile(user, { displayName: name });

  // Build profile data
  const profileData = {
    uid: user.uid,
    email,
    name,
    role,
    avatar: role === 'child' ? '🧒' : role === 'parent' ? '👩' : '🛡️',
    selectedAvatar: role === 'child' ? 0 : null,
    createdAt: serverTimestamp(),
    // Child-specific
    ...(role === 'child' && {
      age: childAge || 9,
      parentId: null,
      streak: 0,
      xp: 0,
      level: 1,
      badges: [],
      completedChallenges: [],
    }),
    // Parent-specific
    ...(role === 'parent' && {
      childrenIds: [],
      childName: childName || '',
      notificationsEnabled: true,
    }),
  };

  // Save profile to Firestore
  await setDoc(doc(db, 'users', user.uid), profileData);

  return profileData;
}

/**
 * Login with email/password
 * Returns the user's Firestore profile
 */
export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Fetch profile from Firestore
  const profileDoc = await getDoc(doc(db, 'users', user.uid));
  if (profileDoc.exists()) {
    return profileDoc.data();
  }

  // Fallback: return basic info if no Firestore profile
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName || 'User',
    role: 'child',
    avatar: '🧒',
  };
}

/**
 * Logout current user
 */
export async function logoutUser() {
  await signOut(auth);
}

/**
 * Get current user's Firestore profile
 */
export async function getUserProfile(uid) {
  const profileDoc = await getDoc(doc(db, 'users', uid));
  if (profileDoc.exists()) {
    return profileDoc.data();
  }
  return null;
}

/**
 * Update user profile in Firestore
 */
export async function updateUserProfile(uid, updates) {
  await updateDoc(doc(db, 'users', uid), updates);
  const updated = await getDoc(doc(db, 'users', uid));
  return updated.data();
}

/**
 * Listen to auth state changes
 * @param {Function} callback - Called with (user) or (null) on state change
 * @returns {Function} unsubscribe function
 */
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}
