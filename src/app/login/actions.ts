'use server'
import { createClient } from '@/src/utils/supabase/server'
import { IResponse } from '@/src/types'
import { cookies } from 'next/headers'
import { IUserCookie } from '@/src/types'
export const createAccount = async ({
  name,
  accountNumber
}: {
  name: string
  accountNumber: number
}): Promise<IResponse<IUserCookie>> => {
  try {
    const cookieStore = cookies()
    const supabase = createClient()
    const { data, error } = await supabase
      .from('accounts')
      .insert({
        name,
        account_number: accountNumber
      })
      .select('id')

    if (error) {
      // duplicate key value (account_number)
      if (error.code === '23505') {
        return {
          errorMessage:
            'El número de cuenta ingresado ya existe en nuestra base de datos'
        }
      }
      return { errorMessage: error?.message || 'Algo salió mal' }
    }
    // si se crea la cuenta, seteamos el user en las cookies y lo devolvemos
    cookieStore.set('user', JSON.stringify(data[0]))
    return { data: data[0] }
  } catch (error: any) {
    return { errorMessage: error.msg || 'Algo salió mal' }
  }
}

export const login = async ({
  accountNumber
}: {
  accountNumber: number
}): Promise<IResponse<IUserCookie>> => {
  try {
    const cookieStore = cookies()
    const supabase = createClient()

    const { data, error } = await supabase
      .from('accounts')
      .select('id')
      .eq('account_number', accountNumber)
    if (error) {
      return { errorMessage: error.message }
    }
    console.log(data[0])
    cookieStore.set('user', JSON.stringify(data[0]))
    return { data: data[0] }
  } catch (error: any) {
    return { errorMessage: error.msg || 'Algo salió mal' }
  }
}
