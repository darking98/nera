import { IResponse } from '../types'
import { handleToast } from './toast'
export const formatCurrency = (amount: string | number) => {
  if (typeof amount === 'string') {
    const number = parseFloat(amount)
    return number?.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  } else {
    return amount?.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }
}

export const formatDate = (createdAt: string) => {
  const date = new Date(createdAt)

  // Opciones de formato
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }

  // Formatear la fecha usando la localización 'es-ES'
  return date.toLocaleDateString('es-ES', options)
}

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString)

  const formattedDate = date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long'
  })

  const formattedTime = date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })

  return `${formattedDate} - ${formattedTime} hs`
}
export const truncateString = (str: string, maxLength: number = 15): string => {
  if (str.length <= maxLength) {
    return str
  }

  return str.slice(0, maxLength) + '...'
}

export const handleRequest = async <T>(
  request: () => Promise<IResponse<T>>
): Promise<{ data?: T; success: boolean }> => {
  const requestData = await request()
  if (Array.isArray(requestData?.errorMessage)) {
    requestData?.errorMessage.map((error) =>
      handleToast({
        status: 'error',
        title: 'Hubo un error',
        text: error
      })
    )
    return { success: false }
  } else if (typeof requestData?.errorMessage === 'string') {
    handleToast({
      status: 'error',
      title: 'Hubo un error',
      text: requestData?.errorMessage
    })
    return { success: false }
  }

  return { data: requestData?.data, success: true }
}
