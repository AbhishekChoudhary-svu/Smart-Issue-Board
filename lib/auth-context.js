"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    await signOut(auth)
  }

  const loginWithEmail = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signupWithEmail = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout, loginWithEmail, signupWithEmail }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
