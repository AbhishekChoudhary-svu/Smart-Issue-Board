// Status transition validation logic
// Allowed flow: Open → In Progress → Done
// No direct Open → Done allowed

export function isValidStatusTransition(currentStatus, newStatus) {
  // If status is the same, it's valid (no change)
  if (currentStatus === newStatus) return true

  // Valid transitions
  const validTransitions = {
    Open: ["In Progress"],
    "In Progress": ["Done", "Open"],
    Done: ["In Progress"],
  }

  return validTransitions[currentStatus]?.includes(newStatus) ?? false
}

export function getStatusTransitionError(currentStatus, newStatus) {
  if (isValidStatusTransition(currentStatus, newStatus)) {
    return null
  }

  if (currentStatus === "Open" && newStatus === "Done") {
    return "Cannot move directly from Open to Done. Please move to In Progress first."
  }

  return "Invalid status transition"
}
