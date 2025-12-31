"use client"

import { useEffect, useState } from "react"
import { getAllIssues } from "@/lib/firestore-utils"
import { IssueCard } from "./issue-card"

export function IssueList({ refreshTrigger }) {
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchIssues = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await getAllIssues()
      setIssues(data)
    } catch (err) {
      setError(err.message || "Failed to load issues")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIssues()
  }, [refreshTrigger])

  if (loading) {
    return <div className="text-foreground text-center py-8">Loading issues...</div>
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
        {error}
      </div>
    )
  }

  if (issues.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">No issues yet. Create one to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} onUpdate={fetchIssues} />
      ))}
    </div>
  )
}
