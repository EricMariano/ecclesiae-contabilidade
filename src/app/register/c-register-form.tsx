import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold">Cadastro</h1>
        <p className="text-muted-foreground text-md text-balance">
          Digite seu email abaixo para fazer cadastro
        </p>
      </div>
      <div className="grid gap-6">  
        {/* nome */}
        <div className="grid gap-3">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" type="text" placeholder="Seu Nome" required />
        </div>

        {/* sobrenome */}
        <div className="grid gap-3">
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input id="lastName" type="text" placeholder="Seu Sobrenome" required />
        </div>

        {/* cpf */}
        <div className="grid gap-3">
          <Label htmlFor="cpf">CPF</Label>
          <Input id="cpf" type="text" placeholder="000.000.000-00" required />
        </div>
        
        {/* telefone */}
        <div className="grid gap-3">
          <Label htmlFor="phone">Telefone</Label>
          <Input id="phone" type="text" placeholder="(00) 00000-0000" required />
        </div> 

        {/* email */}
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="ecclesiae@contabilidade.com" required />
        </div>

        {/* senha */}
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
          </div>
          <Input id="password" type="password" placeholder="********" required />
        </div>

        {/* confirmar senha */}
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          </div>
          <Input id="confirmPassword" type="password" placeholder="********" required />
        </div>

        {/* botão de cadastro */}
        <Button type="submit" className="w-full">
          Cadastrar
        </Button> 
      </div>

      {/* link para login */}
      <div className="text-center text-sm">
        Já tem uma conta?{" "}
          <Link href="/" className="underline underline-offset-4">
          Faça login
        </Link>
      </div>

    </form>
  )
}
