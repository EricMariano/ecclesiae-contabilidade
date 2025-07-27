import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAdminAuth } from '@/lib/middleware'

// GET - Listar todos os documentos (admin)
export const GET = withAdminAuth(async (req: NextRequest, user: any) => {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status')
    const userId = searchParams.get('userId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const whereConditions: any = {}

    if (search) {
      whereConditions.OR = [
        { originalName: { contains: search } },
        { documentType: { name: { contains: search } } },
        { user: { 
          OR: [
            { name: { contains: search } },
            { lastName: { contains: search } },
            { email: { contains: search } },
            { cpf: { contains: search } }
          ]
        }}
      ]
    }

    if (status) {
      whereConditions.status = status
    }

    if (userId) {
      whereConditions.userId = userId
    }

    const documents = await prisma.document.findMany({
      where: whereConditions,
      include: {
        documentType: true,
        user: {
          select: {
            id: true,
            name: true,
            lastName: true,
            email: true,
            cpf: true
          }
        }
      },
      orderBy: { uploadedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })

    const total = await prisma.document.count({
      where: whereConditions
    })

    return NextResponse.json({
      documents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Erro ao buscar documentos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
})