"use client"

import { useEffect, useState } from "react"
import { getAllIssues, getIssuesByStatus, getIssuesByPriority, type Issue } from "@/lib/firestore-utils"
import { IssueCard } from "./issue-card"

interface FilteredIssueListProps {
  statusFilter: string | null
  priorityFilter: string | null
  refreshTrigger?: number
}

export function FilteredIssueList({ statusFilter, priorityFilter, refreshTrigger }: FilteredIssueListProps) {
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchIssues = async () => {
    setLoading(true)
    setError("")
    try {
      let data: Issue[] = []

      if (statusFilter && priorityFilter) {
        // Get all issues and filter by both status and priority
        const allIssues = await getAllIssues()
        data = allIssues.filter((issue) => issue.status === statusFilter && issue.priority === priorityFilter)
      } else if (statusFilter) {
        data = await getIssuesByStatus(statusFilter)
      } else if (priorityFilter) {
        data = await getIssuesByPriority(priorityFilter)
      } else {
        data = await getAllIssues()
      }

      setIssues(data)
    } catch (err: any) {
      setError(err.message || "Failed to load issues")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIssues()
  }, [statusFilter, priorityFilter, refreshTrigger])

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
        <p className="text-muted-foreground">
          No issues match your filters.{" "}
          {statusFilter || priorityFilter ? "Try adjusting filters." : "Create one to get started!"}
        </p>
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
