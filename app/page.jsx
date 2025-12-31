"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function Home() {
  const { user, loading } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
     <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-primary">
          Smart Issue Board
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition">
            Features
          </a>
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition">
            How it Works
          </a>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 text-foreground hover:text-primary transition">
                Log in
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 py-4 space-y-4">
          <a href="#features" className="block text-muted-foreground hover:text-foreground">
            Features
          </a>
          <a href="#how-it-works" className="block text-muted-foreground hover:text-foreground">
            How it Works
          </a>

          {user ? (
            <Link
              href="/dashboard"
              className="block text-center px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="block text-center px-4 py-2">
                Log in
              </Link>
              <Link
                href="/signup"
                className="block text-center px-4 py-2 bg-primary text-primary-foreground rounded-lg"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
    
    {/* Left Content */}
    <div className="text-center md:text-left">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-balance">
        Smart Issue Tracking for Modern Teams
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
        Streamline your workflow with intelligent issue management. Detect similar issues,
        track progress, and collaborate seamlessly with your team.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        {!user && (
          <>
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-semibold"
            >
              Get Started Free
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-3 border border-border rounded-lg hover:bg-card transition font-semibold"
            >
              Sign In
            </Link>
          </>
        )}

        {user && (
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-semibold"
          >
            Go to Dashboard
          </Link>
        )}
      </div>
    </div>

    {/* Right Card */}
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg">
      <div className="space-y-4">
        <div className="h-3 bg-muted rounded-full w-2/3"></div>
        <div className="h-3 bg-muted rounded-full w-4/5"></div>
        <div className="h-3 bg-muted rounded-full w-3/4"></div>

        <div className="mt-8 space-y-3">
          <div className="flex gap-3">
            <div className="h-8 w-8 bg-primary rounded-lg flex-shrink-0"></div>
            <div className="flex-1">
              <div className="h-3 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-2 bg-muted rounded w-1/2"></div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="h-8 w-8 bg-accent rounded-lg flex-shrink-0"></div>
            <div className="flex-1">
              <div className="h-3 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-2 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>


      {/* Features Section */}
     <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-16 text-center">
      Powerful Features
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {[
        {
          title: "Smart Detection",
          desc: "Automatically identify duplicate or similar issues as you create them",
        },
        { title: "Status Workflow", desc: "Move issues through Open → In Progress → Done states seamlessly" },
        { title: "Priority Levels", desc: "Organize by Low, Medium, or High priority for better prioritization" },
        { title: "Real-time Sync", desc: "Firebase-powered synchronization across all devices instantly" },
        { title: "Team Assignment", desc: "Assign issues to team members and track responsibility" },
        { title: "Advanced Filtering", desc: "Filter by status, priority, or combined criteria quickly" },
      ].map((feature, i) => (
        <div
          key={i}
          className="p-5 sm:p-6 border border-border rounded-xl hover:shadow-lg transition"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            {feature.title}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground">
            {feature.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* How It Works */}
     <section id="how-it-works" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-16 text-center">
      How It Works
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      {[
        {
          num: "1",
          title: "Create",
          desc: "Write issue details and watch for similar issues detected in real-time",
        },
        {
          num: "2",
          title: "Track",
          desc: "Move issues through your workflow with status transitions and assignments",
        },
        { num: "3", title: "Manage", desc: "Filter and organize your entire issue backlog for maximum clarity" },
      ].map((step, i) => (
        <div key={i} className="text-center px-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl sm:text-2xl font-bold">
            {step.num}
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            {step.title}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground">
            {step.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
  <div className="max-w-3xl mx-auto text-center">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
      Ready to Transform Your Issue Management?
    </h2>

    <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8">
      Join teams worldwide using Smart Issue Board to streamline their workflows.
    </p>

    {!user && (
      <Link
        href="/signup"
        className="inline-block w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-semibold"
      >
        Start Free Today
      </Link>
    )}
  </div>
</section>


      {/* Footer */}
     <footer className="border-t border-border py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto text-center text-muted-foreground">
    <p className="text-sm sm:text-base">
      © 2025 <span className="font-medium text-foreground">Smart Issue Board</span>. Built for teams that ship fast.
    </p>
  </div>
</footer>

    </div>
  )
}
