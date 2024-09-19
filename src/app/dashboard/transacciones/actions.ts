'use server'
import { TransactionsResponse } from '@/src/types'
import { PaginatedData } from '@/src/types'
import { httpRequest } from '@/src/services/fetch'
export const getTransactions = async ({
  page = 1,
  pageSize = 10
}: PaginatedData): Promise<{ data: TransactionsResponse[]; count: number }> => {
  try {
    const request = await httpRequest(
      `/transactions?page=${page}&page_size=${pageSize}`,
      'GET'
    )
    return request
  } catch (error) {
    throw error
  }
}

export const getTransaction = async ({
  id
}: {
  id: string
}): Promise<TransactionsResponse> => {
  try {
    const request = await httpRequest(`/transactions/${id}/`, 'GET')
    return request
  } catch (error) {
    throw error
  }
}
