import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase"

// Create a new issue
export async function createIssue(title, description, priority, assignedTo, createdBy) {
  const issuesCollection = collection(db, "issues")

  const docRef = await addDoc(issuesCollection, {
    title,
    description,
    priority,
    status: "Open", // Default status
    assignedTo,
    createdBy,
    createdAt: Timestamp.now(),
  })

  return docRef.id
}

// Get all issues sorted by newest first
export async function getAllIssues() {
  const issuesCollection = collection(db, "issues")
  const q = query(issuesCollection, orderBy("createdAt", "desc"))

  const querySnapshot = await getDocs(q)
  const issues = []

  querySnapshot.forEach((doc) => {
    issues.push({
      id: doc.id,
      ...doc.data(),
    })
  })

  return issues
}

// Get issues by status
export async function getIssuesByStatus(status) {
  const issuesCollection = collection(db, "issues")
  const q = query(issuesCollection, where("status", "==", status), orderBy("createdAt", "desc"))

  const querySnapshot = await getDocs(q)
  const issues = []

  querySnapshot.forEach((doc) => {
    issues.push({
      id: doc.id,
      ...doc.data(),
    })
  })

  return issues
}

// Get issues by priority
export async function getIssuesByPriority(priority) {
  const issuesCollection = collection(db, "issues")
  const q = query(issuesCollection, where("priority", "==", priority), orderBy("createdAt", "desc"))

  const querySnapshot = await getDocs(q)
  const issues = []

  querySnapshot.forEach((doc) => {
    issues.push({
      id: doc.id,
      ...doc.data(),
    })
  })

  return issues
}

// Get recent issues for duplicate detection
export async function getRecentIssues(limit = 10) {
  const issuesCollection = collection(db, "issues")
  const q = query(issuesCollection, orderBy("createdAt", "desc"))

  const querySnapshot = await getDocs(q)
  const issues = []

  let count = 0
  querySnapshot.forEach((doc) => {
    if (count < limit) {
      issues.push({
        id: doc.id,
        ...doc.data(),
      })
      count++
    }
  })

  return issues
}

// Update an issue
export async function updateIssue(issueId, updates) {
  const issueDocRef = doc(db, "issues", issueId)
  await updateDoc(issueDocRef, updates)
}

// Delete an issue
export async function deleteIssue(issueId) {
  await deleteDoc(doc(db, "issues", issueId))
}

// Find similar issues by title comparison
export async function findSimilarIssues(title) {
  const recentIssues = await getRecentIssues(50)
  const searchTerm = title.toLowerCase().trim()

  return recentIssues.filter((issue) => {
    const issueTitleLower = issue.title.toLowerCase()
    // Check for exact substring match or similar keywords
    return (
      issueTitleLower.includes(searchTerm) ||
      searchTerm.includes(issueTitleLower) ||
      calculateSimilarity(searchTerm, issueTitleLower) > 0.6
    )
  })
}

// Simple similarity check using word overlap
function calculateSimilarity(str1, str2) {
  const words1 = new Set(str1.split(/\s+/))
  const words2 = new Set(str2.split(/\s+/))

  let matches = 0
  words1.forEach((word) => {
    if (words2.has(word)) matches++
  })

  return (2 * matches) / (words1.size + words2.size) || 0
}
