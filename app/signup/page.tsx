"use client"

import { SignupForm } from "@/components/signup-form"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SignupPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4">
      {/* Back to Home Link */}
      <Link
        href="/"
        className="absolute top-4 left-4 md:top-8 md:left-8 text-muted-foreground hover:text-foreground transition flex items-center gap-2"
      >
        <span>←</span> Back to Home
      </Link>

      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  )
}
