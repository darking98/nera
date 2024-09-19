'use server'
import { cookies } from 'next/headers'
type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
interface HttpRequestOptions {
  headers?: Record<string, string>
  body?: any
}

const API_URL = 'http://localhost:3001'

export const httpRequest = async <T>(
  url: string,
  method: HttpMethod,
  options: HttpRequestOptions = {}
) => {
  const { headers = {}, body } = options
  const cookieStore = cookies()
  const user = cookieStore?.get('user')?.value

  if (!user) {
    throw new Error('No hay user')
  }
  const { id } = JSON.parse(user)

  const fetchOptions: RequestInit = {
    method,
    headers: {
      user_id: id,
      ...headers
    }
  }

  if (body && (method === 'POST' || method === 'PATCH' || method === 'PUT')) {
    fetchOptions.body = JSON.stringify(body)
    fetchOptions.headers = {
      ...fetchOptions.headers,
      'Content-Type': 'application/json'
    }
  }

  try {
    const response = await fetch(`${API_URL}${url}`, fetchOptions)
    const data: T = await response.json()
    if (!response.ok) {
      throw data
    }

    return data as any
  } catch (error) {
    throw error
  }
}
