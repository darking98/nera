'use client'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../app/actions'
export const useGetUser = () => {
  const {
    isLoading,
    data: user,
    refetch
  } = useQuery({
    enabled: false,
    queryKey: ['user'],
    queryFn: () => getUser()
  })

  return { user, isLoading, refetch }
}
