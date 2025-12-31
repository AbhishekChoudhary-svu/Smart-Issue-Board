"use client"

import { useState } from "react"
import { updateIssue, deleteIssue } from "@/lib/firestore-utils"
import { isValidStatusTransition, getStatusTransitionError } from "@/lib/status-transitions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { AlertCircle, Trash2 } from "lucide-react"

export function IssueCard({ issue, onUpdate }) {
  const [status, setStatus] = useState(issue.status)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const priorityColors = {
    Low: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
    Medium: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
    High: "bg-red-500/10 text-red-700 dark:text-red-300",
  }

  const statusColors = {
    Open: "bg-slate-500/10 text-slate-700 dark:text-slate-300",
    "In Progress": "bg-blue-500/10 text-blue-700 dark:text-blue-300",
    Done: "bg-green-500/10 text-green-700 dark:text-green-300",
  }

  const handleStatusChange = async (newStatus) => {
    if (!isValidStatusTransition(status, newStatus)) {
      const error = getStatusTransitionError(status, newStatus)
      setError(error || "Invalid status transition")
      setTimeout(() => setError(""), 3000)
      return
    }

    setLoading(true)
    setError("")

    try {
      await updateIssue(issue.id, { status: newStatus })
      setStatus(newStatus)
      onUpdate()
    } catch (err) {
      setError(err.message || "Failed to update status")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this issue?")) {
      return
    }

    setIsDeleting(true)

    try {
      await deleteIssue(issue.id)
      onUpdate()
    } catch (err) {
      setError(err.message || "Failed to delete issue")
      setIsDeleting(false)
    }
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-4">
      {error && (
        <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/20 rounded-md p-3">
          <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground">{issue.title}</h3>
          {issue.description && <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>}
        </div>

        <Button
          onClick={handleDelete}
          disabled={isDeleting}
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColors[issue.priority]}`}>
          {issue.priority} Priority
        </span>

        <Select value={status} onValueChange={handleStatusChange} disabled={loading}>
          <SelectTrigger className="w-fit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
          </SelectContent>
        </Select>

        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>{status}</span>
      </div>

      <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border">
        <p>
          <strong>Assigned To:</strong> {issue.assignedTo}
        </p>
        <p>
          <strong>Created By:</strong> {issue.createdBy}
        </p>
        <p>
          <strong>Created:</strong> {issue.createdAt?.toDate?.()?.toLocaleDateString?.()}
        </p>
      </div>
    </div>
  )
}
