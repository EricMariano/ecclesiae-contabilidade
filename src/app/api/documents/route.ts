import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/middleware'

// GET - Listar documentos do usuário
export const GET = withAuth(async (req: NextRequest, user: any) => {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const whereConditions: any = {
      userId: user.userId
    }

    if (search) {
      whereConditions.OR = [
        { originalName: { contains: search } },
        { documentType: { name: { contains: search } } }
      ]
    }

    if (status) {
      whereConditions.status = status
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