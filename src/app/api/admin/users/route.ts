import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAdminAuth } from '@/lib/middleware'

// GET - Listar todos os usuários (admin)
export const GET = withAdminAuth(async (req: NextRequest, user: any) => {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const role = searchParams.get('role')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const whereConditions: any = {}

    if (search) {
      whereConditions.OR = [
        { name: { contains: search } },
        { lastName: { contains: search } },
        { email: { contains: search } },
        { cpf: { contains: search } }
      ]
    }

    if (role) {
      whereConditions.role = role
    }

    const users = await prisma.user.findMany({
      where: whereConditions,
      select: {
        id: true,
        email: true,
        name: true,
        lastName: true,
        cpf: true,
        phone: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            documents: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })

    const total = await prisma.user.count({
      where: whereConditions
    })

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
})