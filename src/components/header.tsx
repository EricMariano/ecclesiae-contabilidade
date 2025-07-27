import { GalleryVerticalEnd } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2 font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <Link href="/" className="hover:opacity-80 transition-opacity">
            Ecclesiae Contabilidade
          </Link>
        </div>
      </div>
    </header>
  )
} 