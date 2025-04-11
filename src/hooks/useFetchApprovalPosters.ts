"use client"

import { useState, useEffect } from "react"

interface PosterApproval {
  id: string
  userId: string
  status: "PENDING" | "APPROVED" | "REJECTED" | "REVOKED"
  createdAt: string
  approvalDate: string | null
  adminNote: string | null
}

export const useFetchApprovalPosters = () => {
  const [posterApprovals, setPosterApprovals] = useState<PosterApproval[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/poster`)
      if (!response.ok) {
        throw new Error("Failed to fetch poster approvals")
      }
      const data = await response.json()
      setPosterApprovals(data.data || [])
      setError(null)
    } catch (error: any) {
      setError(error.message || "Failed to fetch poster approvals")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const refetch = () => {
    fetchData()
  }

  return { posterApprovals, isLoading, error, refetch }
}

