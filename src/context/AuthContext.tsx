import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';

interface UserProfile {
  userId: string;
  fullName: string;
  email: string;
  operatorId: string;
  createdAt: any;
  updatedAt: any;
}

interface AuthContextType {
  user: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  googleSignIn: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch human operator profile from Firestore
  const fetchUserProfile = async (uid: string) => {
    const path = `users/${uid}`;
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        setUserProfile(userDocSnap.data() as UserProfile);
      } else {
        setUserProfile(null);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  };

  // Listen to Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserProfile(currentUser.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login Email/Pass
  const login = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign up and register operator in Firestore
  const signUp = async (email: string, password: string, fullName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;
    const path = `users/${userId}`;

    // Create unique physical operator ID
    const randHex = Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0');
    const operatorId = `OP-${randHex}-NODE20`;

    try {
      await setDoc(doc(db, 'users', userId), {
        userId,
        fullName,
        email,
        operatorId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      // Fetch latest profile state immediately
      await fetchUserProfile(userId);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  // Google OAuth sign-in flow (using recommended popup)
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const userId = userCredential.user.uid;
    const path = `users/${userId}`;

    try {
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // First-time user, provision their Nexus OS digital registry
        const randHex = Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0');
        const operatorId = `OP-${randHex}-NODE20`;
        const fullName = userCredential.user.displayName || 'Unnamed Operator';
        const email = userCredential.user.email || 'operator@nexus.io';

        await setDoc(doc(db, 'users', userId), {
          userId,
          fullName,
          email,
          operatorId,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      
      await fetchUserProfile(userId);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  // Log out action
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, login, signUp, googleSignIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
