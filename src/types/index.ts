export interface Product {
  id?: number
  name: string
  status: string
}

export interface Client {
  id?: number
  name: string
  document: string
  phone: string
  email: string
  status: string
}

export interface Header {
  text: string
  value: string
  sortable?: boolean
}

export interface ProductClientAssociationData {
  clients: Client[]
  selectedClientId: number | null
  dialog: boolean
  selectedProducts: Product[]
  products: Product[]
}

export interface ClientListData {
  clients: Client[]
  headers: Header[]
  newClient: Client
  dialogAddClient: boolean
  valid: boolean
  rules: {
    required: (value: string) => boolean | string
    email: (value: string) => boolean | string
    validateCPF: (v: string) => boolean | string
  }
}

export type SnackbarData = {
  message: string
  color: string
}
