'use server'
import { createClient } from '@/src/utils/supabase/server'
import { cookies } from 'next/headers'
import { IUserCookie } from '@/src/types'
import { TransactionsResponse } from '@/src/types'
import { PaginatedData } from '@/src/types'
export const getTransactions = async ({
  page = 1,
  pageSize = 10
}: PaginatedData): Promise<{ data: TransactionsResponse[]; count: number }> => {
  try {
    const supabase = createClient()
    const cookieStore = cookies()
    const user: IUserCookie = JSON.parse(cookieStore.get('user').value) || {}

    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    const { data, error, count } = await supabase
      .from('transactions')
      .select(
        '*, to_account_id(name, id, account_number), account_id(name, id, account_number)',
        {
          count: 'exact'
        }
      )
      .or(`account_id.eq.${user?.id},to_account_id.eq.${user?.id}`)
      .order('created_at', { ascending: false })
      .range(from, to)
    if (error) {
      throw error.message
    }
    return { data, count }
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
    const supabase = createClient()
    const cookieStore = cookies()
    const user: IUserCookie = JSON.parse(cookieStore.get('user').value) || {}
    const { data, error } = await supabase
      .from('transactions')
      .select(
        '*, to_account_id(name, id, account_number), account_id(name, id, account_number)'
      )
      .eq('id', id)
      .or(`account_id.eq.${user?.id},to_account_id.eq.${user?.id}`)

    if (error || data.length === 0) {
      throw error?.message || `La transacción ${id} no existe.`
    }

    return data[0]
  } catch (error) {
    throw error
  }
}
