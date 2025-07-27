"use client"
import * as React from "react"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Document = {
  id: number
  name: string
}

type User = {
  id: number
  name: string
  email: string
  cpfCnpj: string
  documents: Document[]
  uploadedAt: string
}

const users: User[] = [
  {
    id: 1,
    name: "Alice Silva",
    email: "alice@email.com",
    cpfCnpj: "12345678901",
    documents: [
      {
        id: 1,
        name: "Documentos Alice",
      }
    ],
    uploadedAt: "2024-06-01"
  },
]

// Possibilidade de aumentar colunas: basta adicionar mais campos no tipo User e nas colunas abaixo
const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Nome" },
  { key: "email", label: "Email" },
  { key: "cpfCnpj", label: "CPF/CNPJ" },
  { key: "documents", label: "Documentos" },
  { key: "uploadedAt", label: "Data de upload" }
]

export function UserTable() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const openDocumentsModal = (user: User) => {
    setSelectedUser(user)
  }

  const closeModal = () => {
    setSelectedUser(null)
  }

  return (
    <>
      <div className="w-full overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.key === "documents" ? (
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="link"
                          className="p-0 h-auto text-left"
                          onClick={() => openDocumentsModal(user)}
                        >
                          {user.documents.length} documento(s) - Clique para ver
                        </Button>
                      </div>
                    ) : (
                      (user as any)[col.key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Documentos de {selectedUser?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {selectedUser?.documents.map((doc) => (
              <div key={doc.id} className="p-3 border rounded-lg">
                <div className="font-medium">{doc.name}</div>
                <div className="text-sm text-muted-foreground">ID: {doc.id}</div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}