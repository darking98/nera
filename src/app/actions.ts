'use server'
import { Database } from '@/database.types'
import { httpRequest } from '../services/fetch'
export const getUser = async (): Promise<
  Database['public']['Tables']['accounts']['Row']
> => {
  try {
    const response = await httpRequest('/user', 'GET')
    return response
  } catch (error: any) {
    throw error?.message || 'Algo salió mal'
  }
}
