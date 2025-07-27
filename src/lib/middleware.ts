import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './auth'

export function withAuth(handler: (req: NextRequest, user: any) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      const token = req.headers.get('authorization')?.replace('Bearer ', '')
      
      if (!token) {
        return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
      }

      const user = verifyToken(token)
      
      if (!user) {
        return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
      }

      return handler(req, user)
    } catch (error) {
      return NextResponse.json({ error: 'Erro de autenticação' }, { status: 401 })
    }
  }
}

export function withAdminAuth(handler: (req: NextRequest, user: any) => Promise<NextResponse>) {
  return withAuth(async (req: NextRequest, user: any) => {
    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
    }
    return handler(req, user)
  })
}