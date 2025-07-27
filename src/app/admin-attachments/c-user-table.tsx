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
  {
    id: 2,
    name: "Bruno Souza",
    email: "bruno@email.com",
    cpfCnpj: "12345678902",
    documents: [
      {
        id: 2,
        name: "Documentos Bruno",
      }
    ],
    uploadedAt: "2024-05-15"
  },
  {
    id: 3,
    name: "Carla Lima",
    email: "carla@email.com",
    cpfCnpj: "12345678903",
    documents: [
      {
        id: 3,
        name: "Documento 3",
      }
    ],
    uploadedAt: "2024-04-20"
  },
  {
    id: 4,
    name: "Daniel Costa",
    email: "daniel@email.com",
    cpfCnpj: "12345678904",
    documents: [
      {
        id: 4,
        name: "Documento 4",
      }
    ],
    uploadedAt: "2024-03-10"
  },
  {
    id: 5,
    name: "Eduarda Pires",
    email: "eduarda@email.com",
    cpfCnpj: "12345678905",
    documents: [
      {
        id: 5,
        name: "Documento 5",
      }
    ],
    uploadedAt: "2024-02-05"
  },
  {
    id: 6,
    name: "Felipe Ramos",
    email: "felipe@email.com",
    cpfCnpj: "12345678906",
    documents: [
      {
        id: 6,
        name: "Documento 6",
      }
    ],
    uploadedAt: "2024-01-25"
  },
  {
    id: 7,
    name: "Gabriela Torres",
    email: "gabriela@email.com",
    cpfCnpj: "12345678907",
    documents: [
      {
        id: 7,
        name: "Documento 7",
      }
    ],
    uploadedAt: "2023-12-30"
  },
  {
    id: 8,
    name: "Henrique Alves",
    email: "henrique@email.com",
    cpfCnpj: "12345678908",
    documents: [
      {
        id: 8,
        name: "Documento 8"
      }
    ],
    uploadedAt: "2023-11-18"
  }
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