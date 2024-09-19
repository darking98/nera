'use server'
import { cookies } from 'next/headers'
import { ICreateTransaction } from '@/src/types'
import { createClient } from '@/src/utils/supabase/server'
import { Database } from '@/database.types'
import { IUserCookie, IResponse } from '@/src/types'
import { getUser } from '../actions'
export const getBalance = async () => {
  try {
    const supabase = createClient()
    const cookieStore = cookies()
    const user: IUserCookie = JSON.parse(cookieStore.get('user').value) || {}
    const { data, error } = await supabase.rpc('calculate_balance', {
      user_id: user?.id
    })
    if (error) {
      throw error
    }
    return data
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
    const supabase = createClient()
    const cookieStore = cookies()
    const user: IUserCookie = JSON.parse(cookieStore.get('user').value) || {}
    let transaction: Database['public']['Tables']['transactions']['Insert'] = {
      account_id: user?.id
    }
    // Primero validamos si el usaurio tiene balance para transferir ese monto
    if (type === 'transfer' || type === 'withdraw') {
      const balance = await getBalance()
      if (amount > balance) {
        return {
          errorMessage:
            'No tenes suficiente balance para realizar esta operación'
        }
      }
    }
    if (type === 'deposit') {
      transaction.amount = amount
      transaction.type = 'deposit'
    } else if (type === 'withdraw') {
      transaction.amount = amount
      transaction.external_account = to as string
      transaction.type = 'withdraw'
    } else if (type === 'transfer') {
      // Nos traemos el id del usuario en base a su número de cuenta
      const { data, error } = await supabase
        .from('accounts')
        .select('id, account_number')
        .eq('account_number', to)
      if (error || data.length === 0) {
        return {
          errorMessage:
            error?.message ||
            'El número de ingresado no corresponde a una cuenta registrada en Nera'
        }
      }
      // Validamos que no se esté transfiriendo a sí mismo
      const user = await getUser()
      if (user?.account_number === to) {
        return {
          errorMessage: 'No podes transferir a tu propia cuenta'
        }
      }
      transaction.to_account_id = data[0].id as number
      transaction.amount = amount
      transaction.concept = concept
      transaction.type = 'transfer'
    }

    const { data, error } = await supabase
      .from('transactions')
      .insert(transaction)
      .select('*')

    if (error) {
      return { errorMessage: error?.message || 'Algo salió mal' }
    }

    return { data: data[0] }
  } catch (error: any) {
    return { errorMessage: error?.msg || 'Algo salió mal' }
  }
}

export const logout = async () => {
  const cookieStore = cookies()
  cookieStore.delete('user')
  await new Promise((resolve) => setTimeout(resolve, 500))
}
