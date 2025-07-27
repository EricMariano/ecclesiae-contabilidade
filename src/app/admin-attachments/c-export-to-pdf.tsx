"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, CheckCircle, Circle, User, Search } from "lucide-react"

type Document = {
  id: number
  name: string
  category: string
  required: boolean
  uploaded: boolean
  size?: number
  uploadedAt?: string
}

type Client = {
  id: number
  name: string
  documents: Document[]
}

const mockClients: Client[] = [
  {
    id: 1,
    name: "João Silva",
    documents: [
      {
        id: 1,
        name: "Balanço Patrimonial 2022 e 2023",
        category: "Demonstrações Contábeis",
        required: true,
        uploaded: true,
        size: 1024000,
        uploadedAt: "2024-01-01"
      },
      {
        id: 2,
        name: "ECD ano base 2022",
        category: "Declarações Fiscais",
        required: true,
        uploaded: false
      }
    ]
  },
  {
    id: 2,
    name: "Maria Santos",
    documents: [
      {
        id: 1,
        name: "Demonstrações Contábeis consolidadas - 2022 e 2023",
        category: "Demonstrações Contábeis",
        required: true,
        uploaded: true,
        size: 2048000,
        uploadedAt: "2024-01-15"
      },
      {
        id: 2,
        name: "DCTF - jan/2022 a dez/2023",
        category: "Declarações Fiscais",
        required: true,
        uploaded: true,
        size: 1536000,
        uploadedAt: "2024-01-20"
      }
    ]
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    documents: []
  },
  {
    id: 4,
    name: "Ana Costa",
    documents: [
      {
        id: 1,
        name: "Fluxo de Caixa 2022 e 2023",
        category: "Demonstrações Contábeis",
        required: true,
        uploaded: true,
        size: 512000,
        uploadedAt: "2024-02-01"
      }
    ]
  },
  {
    id: 5,
    name: "Carlos Ferreira",
    documents: []
  },
  {
    id: 6,
    name: "Lucia Mendes",
    documents: [
      {
        id: 1,
        name: "Notas Explicativas 2022 e 2023",
        category: "Demonstrações Contábeis",
        required: true,
        uploaded: true,
        size: 768000,
        uploadedAt: "2024-02-10"
      }
    ]
  }
]

const defaultDocuments: Document[] = [
  {
    id: 1,
    name: "Demonstrações Contábeis consolidadas (matriz e filiais) - 2022 e 2023",
    category: "Demonstrações Contábeis",
    required: true,
    uploaded: false
  },
  {
    id: 2,
    name: "Balanço Patrimonial 2022 e 2023",
    category: "Demonstrações Contábeis",
    required: true,
    uploaded: false
  },
  {
    id: 3,
    name: "Demonstração do Superávit/Déficit do Período 2022 e 2023",
    category: "Demonstrações Contábeis",
    required: true,
    uploaded: false
  },
  {
    id: 4,
    name: "DMPL 2022 e 2023",
    category: "Demonstrações Contábeis",
    required: true,
    uploaded: false
  },
  {
    id: 5,
    name: "Fluxo de Caixa 2022 e 2023",
    category: "Demonstrações Contábeis",
    required: true,
    uploaded: false
  },
  {
    id: 6,
    name: "Notas Explicativas 2022 e 2023",
    category: "Demonstrações Contábeis",
    required: true,
    uploaded: false
  },
  {
    id: 7,
    name: "Razões Analíticos da Cúria Diocesana - jan/2022 a dez/2022",
    category: "Razões e Balancetes",
    required: true,
    uploaded: false
  },
  {
    id: 8,
    name: "Razões Analíticos da Cúria Diocesana - jan/2023 a dez/2023",
    category: "Razões e Balancetes",
    required: true,
    uploaded: false
  },
  {
    id: 9,
    name: "Balancetes mensais da Cúria Diocesana - jan/2022 a dez/2022",
    category: "Razões e Balancetes",
    required: true,
    uploaded: false
  },
  {
    id: 10,
    name: "Balancetes mensais da Cúria Diocesana - jan/2023 a dez/2023",
    category: "Razões e Balancetes",
    required: true,
    uploaded: false
  },
  {
    id: 11,
    name: "ECD ano base 2021",
    category: "Declarações Fiscais",
    required: true,
    uploaded: false
  },
  {
    id: 12,
    name: "ECD ano base 2022",
    category: "Declarações Fiscais",
    required: true,
    uploaded: false
  },
  {
    id: 13,
    name: "ECF ano base 2021",
    category: "Declarações Fiscais",
    required: true,
    uploaded: false
  },
  {
    id: 14,
    name: "ECF ano base 2022",
    category: "Declarações Fiscais",
    required: true,
    uploaded: false
  },
  {
    id: 15,
    name: "DCTF - jan/2022 a dez/2023 (recibo e declaração)",
    category: "Declarações Fiscais",
    required: true,
    uploaded: false
  },
  {
    id: 16,
    name: "Apólices de Seguros dos Imóveis",
    category: "Certidões e Apólices",
    required: false,
    uploaded: false
  },
  {
    id: 17,
    name: "Certidão de Regularidade do FGTS – CRF",
    category: "Certidões e Apólices",
    required: true,
    uploaded: false
  },
  {
    id: 18,
    name: "Certidão Negativa de Débitos Relativos aos Tributos Federais",
    category: "Certidões e Apólices",
    required: true,
    uploaded: false
  },
  {
    id: 19,
    name: "Certidão Negativa de Tributos Mobiliários da Cúria",
    category: "Certidões e Apólices",
    required: true,
    uploaded: false
  },
  {
    id: 20,
    name: "Certidão Negativa de Tributos do Estado",
    category: "Certidões e Apólices",
    required: true,
    uploaded: false
  },
  {
    id: 21,
    name: "CEBAS – Certificação de Entidades Beneficentes",
    category: "Certidões e Apólices",
    required: false,
    uploaded: false
  },
  {
    id: 22,
    name: "Documentos comprobatórios de receitas e despesas - jan/2022 a dez/2023",
    category: "Comprovantes",
    required: true,
    uploaded: false
  },
  {
    id: 23,
    name: "Extratos bancários (conta corrente e aplicações) - jan/2022 a dez/2023",
    category: "Comprovantes",
    required: true,
    uploaded: false
  }
]

export function ExportToPDF() {
    const [isOpen, setIsOpen] = useState(false)
    const [isExporting, setIsExporting] = useState(false)
    const [selectedClientId, setSelectedClientId] = useState<string>("")
    const [searchTerm, setSearchTerm] = useState("")
    
    const filteredClients = mockClients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    const selectedClient = mockClients.find(client => client.id.toString() === selectedClientId)
    const documents = selectedClient?.documents || defaultDocuments
    const uploadedCount = documents.filter(doc => doc.uploaded).length
    const requiredCount = documents.filter(doc => doc.required).length
    const uploadedRequiredCount = documents.filter(doc => doc.required && doc.uploaded).length
    
    const handleExport = async () => {
        if (!selectedClient) return
        
        setIsExporting(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            console.log(`Exportando ${uploadedCount} documentos de ${selectedClient.name} para PDF`)
        } catch (error) {
            console.error('Erro ao exportar:', error)
        } finally {
            setIsExporting(false)
            setIsOpen(false)
        }
    }
    
    const groupedDocuments = documents.reduce((acc, doc) => {
        if (!acc[doc.category]) {
            acc[doc.category] = []
        }
        acc[doc.category].push(doc)
        return acc
    }, {} as Record<string, Document[]>)
    
    return(
        <>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Documentos para Exportação</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                <span className="font-medium">Selecionar Cliente</span>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Digite o nome do cliente..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                
                                {searchTerm && (
                                    <div className="text-sm text-muted-foreground">
                                        {filteredClients.length} cliente(s) encontrado(s)
                                    </div>
                                )}
                            </div>
                            
                            <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Escolha um cliente" />
                                </SelectTrigger>
                                <SelectContent>
                                    {filteredClients.length > 0 ? (
                                        filteredClients.map((client) => (
                                            <SelectItem key={client.id} value={client.id.toString()}>
                                                {client.name}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <div className="p-2 text-sm text-muted-foreground">
                                            Nenhum cliente encontrado
                                        </div>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        {selectedClient && (
                            <>
                                <div className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    <span className="font-medium">Cliente: {selectedClient.name}</span>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">{uploadedCount}</div>
                                        <div className="text-sm text-gray-600">Documentos anexados</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">{uploadedRequiredCount}/{requiredCount}</div>
                                        <div className="text-sm text-gray-600">Obrigatórios completos</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-600">{documents.length}</div>
                                        <div className="text-sm text-gray-600">Total de documentos</div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {Object.entries(groupedDocuments).map(([category, docs]) => (
                                        <div key={category} className="space-y-2">
                                            <h4 className="font-medium text-lg border-b pb-2">{category}</h4>
                                            <div className="space-y-2">
                                                {docs.map((doc) => (
                                                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                                                        <div className="flex items-center gap-3">
                                                            {doc.uploaded ? (
                                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                            ) : (
                                                                <Circle className="h-5 w-5 text-gray-400" />
                                                            )}
                                                            <div>
                                                                <div className="font-medium">{doc.name}</div>
                                                                <div className="text-sm text-muted-foreground">
                                                                    {doc.required ? 'Obrigatório' : 'Opcional'}
                                                                    {doc.uploaded && doc.size && ` • ${(doc.size / 1024 / 1024).toFixed(2)} MB`}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </DialogDescription>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Fechar
                    </Button>
                    <Button 
                        onClick={handleExport} 
                        disabled={isExporting || !selectedClient || uploadedCount === 0}
                        className="flex items-center gap-2"
                    >
                        {isExporting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Exportando...
                            </>
                        ) : (
                            <>
                                <Download className="h-4 w-4" />
                                Exportar PDF ({uploadedCount} docs)
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        <Button 
            onClick={() => setIsOpen(true)} 
            variant="outline"
            className="h-10 w-40 flex items-center gap-2"
        >
            <Download className="h-4 w-4" />
            Exportar PDF
        </Button>
        </> 
    )
}