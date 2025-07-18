import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-muted-foreground text-md text-balance">
          Digite seu email abaixo para fazer login
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="ecclesiae@contabilidade.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
          </div>
          <Input id="password" type="password" placeholder="********" required />
        </div>
        <div className="flex items-center">
          <a
            href="#"
            className="ml-auto text-sm underline-offset-4 hover:underline"
          >
            Esqueceu sua senha?
          </a>
          </div>
        <Button type="submit" className="w-full">
          Login
        </Button> 
      </div>
      <div className="text-center text-sm">
        Não tem uma conta?{" "}
        <a href="#" className="underline underline-offset-4">
          Cadastre-se
        </a>
      </div>
    </form>
  )
}
