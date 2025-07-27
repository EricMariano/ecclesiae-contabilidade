"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Dropzone, DropzoneEmptyState, DropzoneContent } from "@/components/ui/dropzone"
import { CheckCircle, Circle, Upload, FileText } from "lucide-react"

type Document = {
  id: number
  name: string
  category: string
  required: boolean
  uploaded: boolean
  size?: number
  uploadedAt?: string
}

const requiredDocuments: Document[] = [
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

export function AttachNew(){
    const [isOpen, setIsOpen] = useState(false)
    const [documents, setDocuments] = useState<Document[]>(requiredDocuments)
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
    const [uploadingDocument, setUploadingDocument] = useState<number | null>(null)
    
    const handleDocumentUpload = (documentId: number, files: File[]) => {
        if (files.length > 0) {
            setUploadingDocument(documentId)
            
            // Simular upload
            setTimeout(() => {
                setDocuments(prev => prev.map(doc => 
                    doc.id === documentId 
                        ? { 
                            ...doc, 
                            uploaded: true, 
                            size: files[0].size,
                            uploadedAt: new Date().toISOString()
                        }
                        : doc
                ))
                setUploadingDocument(null)
                setSelectedDocument(null)
            }, 1500)
        }
    }
    
    const groupedDocuments = documents.reduce((acc, doc) => {
        if (!acc[doc.category]) {
            acc[doc.category] = []
        }
        acc[doc.category].push(doc)
        return acc
    }, {} as Record<string, Document[]>)
    
    const uploadedCount = documents.filter(doc => doc.uploaded).length
    const requiredCount = documents.filter(doc => doc.required).length
    const uploadedRequiredCount = documents.filter(doc => doc.required && doc.uploaded).length
    
    return(
        <>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Anexar Documentos</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            <span className="font-medium">Documentos Necessários para Auditoria</span>
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
                                                <div className="flex items-center gap-3 flex-1">
                                                    {doc.uploaded ? (
                                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                                    ) : (
                                                        <Circle className="h-5 w-5 text-gray-400" />
                                                    )}
                                                    <div className="flex-1">
                                                        <div className="font-medium">{doc.name}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {doc.required ? 'Obrigatório' : 'Opcional'}
                                                            {doc.uploaded && doc.size && ` • ${(doc.size / 1024 / 1024).toFixed(2)} MB`}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {!doc.uploaded && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => setSelectedDocument(doc)}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <Upload className="h-4 w-4" />
                                                            Anexar
                                                        </Button>
                                                    )}
                                                    {doc.uploaded && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => setSelectedDocument(doc)}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <Upload className="h-4 w-4" />
                                                            Substituir
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>

        {/* Modal para upload individual */}
        <Dialog open={!!selectedDocument} onOpenChange={(open) => !open && setSelectedDocument(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Anexar: {selectedDocument?.name}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            {selectedDocument?.required ? 'Este documento é obrigatório.' : 'Este documento é opcional.'}
                        </p>
                        <Dropzone 
                            onDrop={(files) => selectedDocument && handleDocumentUpload(selectedDocument.id, files)}
                            disabled={uploadingDocument !== null}
                        >
                            <DropzoneEmptyState />
                            <DropzoneContent />
                        </Dropzone>
                        {uploadingDocument === selectedDocument?.id && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                Enviando documento...
                            </div>
                        )}
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>

        <Button 
            onClick={() => setIsOpen(true)} 
            className="h-10 w-40 flex items-center gap-2"
        >
            <Upload className="h-4 w-4" />
            Anexar Docs
        </Button>
        </> 
    )
}