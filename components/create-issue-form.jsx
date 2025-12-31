"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { createIssue, findSimilarIssues } from "@/lib/firestore-utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"

export function CreateIssueForm({ onIssueCreated }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("Medium")
  const [assignedTo, setAssignedTo] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [similarIssues, setSimilarIssues] = useState([])
  const [showSimilarWarning, setShowSimilarWarning] = useState(false)
  const { user } = useAuth()

  const checkSimilarIssues = async (issueTitle) => {
    if (issueTitle.trim().length < 3) {
      setSimilarIssues([])
      setShowSimilarWarning(false)
      return
    }

    try {
      const similar = await findSimilarIssues(issueTitle)
      if (similar.length > 0) {
        setSimilarIssues(similar)
        setShowSimilarWarning(true)
      } else {
        setSimilarIssues([])
        setShowSimilarWarning(false)
      }
    } catch (err) {
      console.error("Error checking similar issues:", err)
    }
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
    checkSimilarIssues(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!user?.email) {
        setError("User not authenticated")
        return
      }

      await createIssue(title, description, priority, assignedTo || "Unassigned", user.email)

      // Reset form
      setTitle("")
      setDescription("")
      setPriority("Medium")
      setAssignedTo("")
      setSimilarIssues([])
      setShowSimilarWarning(false)

      onIssueCreated()
    } catch (err) {
      setError(err.message || "Failed to create issue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-6 space-y-4">
      <h2 className="text-xl font-bold text-foreground">Create New Issue</h2>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {showSimilarWarning && similarIssues.length > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">Similar issues found</p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                {similarIssues.length} similar issue{similarIssues.length !== 1 ? "s" : ""} already exist. Please review
                before creating.
              </p>
              <ul className="mt-3 space-y-1">
                {similarIssues.slice(0, 3).map((issue) => (
                  <li key={issue.id} className="text-xs text-yellow-700 dark:text-yellow-300">
                    • {issue.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
          Title <span className="text-destructive">*</span>
        </label>
        <Input
          id="title"
          type="text"
          placeholder="Brief description of the issue"
          value={title}
          onChange={handleTitleChange}
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Detailed description of the issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          rows={4}
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-foreground mb-2">
            Priority
          </label>
          <Select value={priority} onValueChange={(value) => setPriority(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="assignedTo" className="block text-sm font-medium text-foreground mb-2">
            Assigned To
          </label>
          <Input
            id="assignedTo"
            type="text"
            placeholder="Name "
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating issue..." : "Create Issue"}
      </Button>
    </form>
  )
}
