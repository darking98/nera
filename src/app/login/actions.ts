'use server'
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
    const body = JSON.stringify({ name, account_number: accountNumber })
    const response = await fetch('http://localhost:3001/accounts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Agrega el encabezado Content-Type
      },
      body
    })
    const data = await response.json()
    if (!response.ok) {
      return { errorMessage: data?.error || 'Algo salió mal' }
    }
    // si se crea la cuenta, seteamos el user en las cookies y lo devolvemos
    cookieStore.set('user', JSON.stringify(data))
    return { data: data }
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
    const body = JSON.stringify({ account_number: accountNumber })
    const response = await fetch('http://localhost:3001/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Agrega el encabezado Content-Type
      },
      body
    })
    const data = await response.json()
    if (!response.ok) {
      return { errorMessage: data?.error || 'Algo salió mal' }
    }
    cookieStore.set('user', JSON.stringify(data))
    return { data: data }
  } catch (error: any) {
    return { errorMessage: error.msg || 'Algo salió mal' }
  }
}
