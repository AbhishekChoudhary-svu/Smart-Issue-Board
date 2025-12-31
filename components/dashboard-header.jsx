"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Smart Issue Board</h1>
          <p className="text-sm text-muted-foreground">Logged in as {user?.email}</p>
        </div>
        <Button onClick={handleLogout} variant="outline">
          Logout
        </Button>
      </div>
    </header>
  )
}
