export interface StateProps {
  _id: string
  name: string
  key: string
}

export interface CustomerProps {
  _id: string
  name: string
  address?: string
  gstInNumber?: string
  contact?: string
  state: StateProps
}

export interface InvoiceProps {
  _id: string
  name: string
  customer: CustomerProps
  invoiceNumber: number
  invoiceDate: Date | string
  products: Array<ProductProps>
  brand: string
  bucket: string
  discount?: number
  invoicePrefix?: string
  invoiceSuffix?: string
  zeroPrefix?: number
}

export interface ProductProps {
  _id: string
  name: string
  price?: number
  quantity?: number
  gst?: number
  hsncode?: string
  mrp?: number
  reference?: any
  free?: number
  unit?: any
}

export interface InvoiceProductProps extends ProductProps {
  dirty?: boolean
}
