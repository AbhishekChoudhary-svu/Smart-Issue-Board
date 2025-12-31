"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function IssueFilters({ statusFilter, priorityFilter, onStatusChange, onPriorityChange }) {
  const hasActiveFilters = statusFilter !== null || priorityFilter !== null

  return (
    <div className="bg-card rounded-lg border border-border p-4 space-y-4">
      <h3 className="font-semibold text-foreground">Filters</h3>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Status</label>
        <Select value={statusFilter || "all"} onValueChange={(value) => onStatusChange(value === "all" ? null : value)}>
          <SelectTrigger>
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Priority</label>
        <Select
          value={priorityFilter || "all"}
          onValueChange={(value) => onPriorityChange(value === "all" ? null : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button
          onClick={() => {
            onStatusChange(null)
            onPriorityChange(null)
          }}
          variant="outline"
          className="w-full"
        >
          Clear Filters
        </Button>
      )}
    </div>
  )
}
