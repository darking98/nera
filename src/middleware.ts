import { NextRequest, NextResponse } from 'next/server'
import { getUser } from './app/actions'
export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  try {
    const user = await getUser()

    // Manejo de rutas con autenticación
    // manejo de ruta login
    if (!user) {
      if (request.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url))
      }
      return res
    }

    // manejo de ruta del dashboard en la ruta del dashboard
    if (user) {
      if (request.nextUrl.pathname !== '/dashboard') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
      return res
    }
  } catch (error) {
    // si getUser da un error, puede ser porque el id no existe en la db, lo mandamos al login y borramos la cookie
    if (request.nextUrl.pathname !== '/login') {
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('user')
      return response
    }
  }
  return res
}

export const config = {
  matcher: ['/login', '/dashboard']
}
