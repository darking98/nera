'use client'
import { useQuery } from '@tanstack/react-query'
import { getBalance } from '../app/dashboard/actions'
export const useGetBalance = () => {
  const {
    isLoading,
    data: balance,
    refetch
  } = useQuery({
    enabled: false,
    queryKey: ['balance'],
    queryFn: () => getBalance()
  })

  return { balance, isLoading, refetch }
}
