import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password, confirmPassword, name, lastName, cpf, phone } = await req.json()

    // Validações básicas
    if (!email || !password || !confirmPassword || !name || !lastName || !cpf || !phone) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Senhas não conferem' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      )
    }

    // Verificar se o email já existe
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUserByEmail) {
      return NextResponse.json(
        { error: 'Email já está em uso' },
        { status: 409 }
      )
    }

    // Verificar se o CPF já existe
    const existingUserByCpf = await prisma.user.findUnique({
      where: { cpf }
    })

    if (existingUserByCpf) {
      return NextResponse.json(
        { error: 'CPF já está em uso' },
        { status: 409 }
      )
    }

    // Criar usuário
    const hashedPassword = hashPassword(password)
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        lastName,
        cpf,
        phone,
        role: 'CLIENT'
      }
    })

    // Gerar token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    // Salvar sessão no banco
    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dias
      }
    })

    return NextResponse.json({
      message: 'Usuário criado com sucesso',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        role: user.role
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Erro no registro:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}