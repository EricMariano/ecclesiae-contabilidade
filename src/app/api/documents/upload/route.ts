import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/middleware'

export const POST = withAuth(async (req: NextRequest, user: any) => {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const documentTypeId = formData.get('documentTypeId') as string

    if (!file) {
      return NextResponse.json(
        { error: 'Arquivo é obrigatório' },
        { status: 400 }
      )
    }

    if (!documentTypeId) {
      return NextResponse.json(
        { error: 'Tipo de documento é obrigatório' },
        { status: 400 }
      )
    }

    // Verificar se o tipo de documento existe
    const documentType = await prisma.documentType.findUnique({
      where: { id: documentTypeId }
    })

    if (!documentType) {
      return NextResponse.json(
        { error: 'Tipo de documento não encontrado' },
        { status: 404 }
      )
    }

    // Verificar tamanho do arquivo (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. Máximo 10MB' },
        { status: 400 }
      )
    }

    // Verificar tipo de arquivo
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de arquivo não permitido' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Gerar nome único para o arquivo
    const timestamp = Date.now()
    const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const uploadDir = path.join(process.cwd(), 'uploads', user.userId)
    const filePath = path.join(uploadDir, fileName)

    // Criar diretório se não existir
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Salvar arquivo
    await writeFile(filePath, buffer)

    // Salvar no banco de dados
    const document = await prisma.document.create({
      data: {
        fileName,
        originalName: file.name,
        filePath: `/uploads/${user.userId}/${fileName}`,
        fileSize: file.size,
        mimeType: file.type,
        userId: user.userId,
        documentTypeId,
        status: 'UPLOADED'
      },
      include: {
        documentType: true
      }
    })

    return NextResponse.json({
      message: 'Arquivo enviado com sucesso',
      document
    }, { status: 201 })

  } catch (error) {
    console.error('Erro no upload:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
})