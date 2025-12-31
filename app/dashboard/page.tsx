"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProtectedLayout } from "@/components/protected-layout"
import { CreateIssueForm } from "@/components/create-issue-form"
import { IssueFilters } from "@/components/issue-filters"
import { FilteredIssueList } from "@/components/filtered-issue-list"

export default function DashboardPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null)

  const handleIssueCreated = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <ProtectedLayout>
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters and create form */}
          <div className="lg:col-span-1 space-y-6">
            <CreateIssueForm onIssueCreated={handleIssueCreated} />
            <IssueFilters
              statusFilter={statusFilter}
              priorityFilter={priorityFilter}
              onStatusChange={setStatusFilter}
              onPriorityChange={setPriorityFilter}
            />
          </div>

          {/* Issues List */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {statusFilter || priorityFilter ? "Filtered Issues" : "All Issues"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {statusFilter && `Status: ${statusFilter}`}
                {statusFilter && priorityFilter && " • "}
                {priorityFilter && `Priority: ${priorityFilter}`}
              </p>
            </div>
            <FilteredIssueList
              statusFilter={statusFilter}
              priorityFilter={priorityFilter}
              refreshTrigger={refreshTrigger}
            />
          </div>
        </div>
      </main>
    </ProtectedLayout>
  )
}
