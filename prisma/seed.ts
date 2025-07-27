import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/lib/auth'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Criar usuário admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ecclesiae.com' },
    update: {},
    create: {
      email: 'admin@ecclesiae.com',
      password: hashPassword('admin123'),
      name: 'Admin',
      lastName: 'Ecclesiae',
      cpf: '00000000000',
      phone: '(00) 00000-0000',
      role: 'ADMIN'
    }
  })

  console.log('✅ Usuário admin criado:', admin.email)

  // Criar tipos de documentos baseados no seu modal
  const documentTypes = [
    {
      name: 'Demonstrações Contábeis consolidadas (matriz e filiais) - 2022 e 2023',
      category: 'Demonstrações Contábeis',
      description: 'Demonstrações contábeis completas da empresa',
      required: true
    },
    {
      name: 'Balanço Patrimonial 2022 e 2023',
      category: 'Demonstrações Contábeis',
      description: 'Balanço patrimonial dos últimos dois anos',
      required: true
    },
    {
      name: 'Demonstração do Superávit/Déficit do Período 2022 e 2023',
      category: 'Demonstrações Contábeis',
      description: 'Demonstração de resultados do período',
      required: true
    },
    {
      name: 'DMPL 2022 e 2023',
      category: 'Demonstrações Contábeis',
      description: 'Demonstração das Mutações do Patrimônio Líquido',
      required: true
    },
    {
      name: 'Fluxo de Caixa 2022 e 2023',
      category: 'Demonstrações Contábeis',
      description: 'Demonstração do fluxo de caixa',
      required: true
    },
    {
      name: 'Notas Explicativas 2022 e 2023',
      category: 'Demonstrações Contábeis',
      description: 'Notas explicativas das demonstrações contábeis',
      required: true
    },
    {
      name: 'Livro Diário 2022 e 2023',
      category: 'Livros Contábeis',
      description: 'Livro diário completo',
      required: true
    },
    {
      name: 'Livro Razão 2022 e 2023',
      category: 'Livros Contábeis',
      description: 'Livro razão completo',
      required: true
    },
    {
      name: 'Balancetes de Verificação mensais 2022 e 2023',
      category: 'Livros Contábeis',
      description: 'Balancetes mensais dos últimos dois anos',
      required: true
    },
    {
      name: 'Plano de Contas 2022 e 2023',
      category: 'Livros Contábeis',
      description: 'Plano de contas utilizado',
      required: true
    },
    {
      name: 'Contratos Sociais atualizados',
      category: 'Documentos Societários',
      description: 'Contratos sociais e alterações',
      required: true
    },
    {
      name: 'Atas de Assembleias e Reuniões 2022 e 2023',
      category: 'Documentos Societários',
      description: 'Atas de assembleias e reuniões dos sócios',
      required: true
    },
    {
      name: 'CPF/CNPJ dos sócios, administradores e membros',
      category: 'Documentos Societários',
      description: 'Documentos de identificação',
      required: true
    }
  ]

  for (const docType of documentTypes) {
    await prisma.documentType.upsert({
      where: { name: docType.name },
      update: {},
      create: docType
    })
  }

  console.log('✅ Tipos de documentos criados')

  // Criar usuário de teste
  const testUser = await prisma.user.upsert({
    where: { email: 'teste@ecclesiae.com' },
    update: {},
    create: {
      email: 'teste@ecclesiae.com',
      password: hashPassword('teste123'),
      name: 'Cliente',
      lastName: 'Teste',
      cpf: '12345678901',
      phone: '(11) 99999-9999',
      role: 'CLIENT'
    }
  })

  console.log('✅ Usuário de teste criado:', testUser.email)

  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })