'use server'
import { cookies } from 'next/headers'
import { ICreateTransaction } from '@/src/types'
import { Database } from '@/database.types'
import { IResponse } from '@/src/types'
import { httpRequest } from '@/src/services/fetch'
export const getBalance = async () => {
  try {
    const response = await httpRequest('/accounts/balance', 'GET')
    return response
  } catch (error) {
    throw error
  }
}

export const createTransaction = async ({
  amount,
  type,
  to,
  concept
}: ICreateTransaction): Promise<
  IResponse<Database['public']['Tables']['transactions']['Row']>
> => {
  try {
    const body = { amount, type, to, concept }
    const response = await httpRequest('/transactions/', 'POST', {
      body
    })
    return response
  } catch (error: any) {
    return { errorMessage: error?.msg || 'Algo salió mal' }
  }
}

export const logout = async () => {
  const cookieStore = cookies()
  cookieStore.delete('user')
  await new Promise((resolve) => setTimeout(resolve, 500))
}
