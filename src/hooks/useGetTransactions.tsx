'use client'
import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTransactions } from '../app/dashboard/transacciones/actions'
export const useGetTransactions = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const {
    isLoading,
    data: transactions,
    refetch
  } = useQuery({
    enabled: true,
    queryKey: ['transactions', page, pageSize],
    queryFn: () => getTransactions({ page, pageSize })
  })

  return {
    transactions,
    isLoading,
    refetch,
    setPage,
    setPageSize,
    page,
    pageSize
  }
}
