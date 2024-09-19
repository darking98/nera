'use server'
import { createClient } from '@/src/utils/supabase/server'
import { Database } from '@/database.types'
import { cookies } from 'next/headers'
import { IUserCookie } from '../types'
export const getUser = async (): Promise<
  Database['public']['Tables']['accounts']['Row']
> => {
  try {
    const cookieStore = cookies()
    const user: IUserCookie = JSON.parse(cookieStore.get('user')?.value)

    // si no hay usuario retornamos
    if (!user) return

    const supabase = createClient()
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('id', user?.id)

    if (error) {
      throw error?.message || 'Algo salió mal'
    }

    return data[0]
  } catch (error: any) {
    throw error?.message || 'Algo salió mal'
  }
}
