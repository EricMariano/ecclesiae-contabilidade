import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth, withAdminAuth } from '@/lib/middleware'

// GET - Listar tipos de documentos
export const GET = withAuth(async (req: NextRequest, user: any) => {
  try {
    const documentTypes = await prisma.documentType.findMany({
      orderBy: { category: 'asc' }
    })

    return NextResponse.json({ documentTypes })

  } catch (error) {
    console.error('Erro ao buscar tipos de documentos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
})

// POST - Criar tipo de documento (admin apenas)
export const POST = withAdminAuth(async (req: NextRequest, user: any) => {
  try {
    const { name, category, description, required } = await req.json()

    if (!name || !category) {
      return NextResponse.json(
        { error: 'Nome e categoria são obrigatórios' },
        { status: 400 }
      )
    }

    const documentType = await prisma.documentType.create({
      data: {
        name,
        category,
        description,
        required: required || false
      }
    })

    return NextResponse.json({
      message: 'Tipo de documento criado com sucesso',
      documentType
    }, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar tipo de documento:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
})