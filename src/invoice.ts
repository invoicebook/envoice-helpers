import sumBy from 'lodash.sumby'
import Product from './product'
import { CustomerProps, InvoiceProps, ProductProps } from './types'

export default class Invoice {
  _id: string
  customer: CustomerProps
  invoiceNumber: number
  invoiceDate: Date
  products: Array<Product>
  brand: string
  bucket: string
  discount?: number
  invoicePrefix?: string
  invoiceSuffix?: string
  zeroPrefix?: number

  constructor(props: InvoiceProps) {
    this._id = props._id
    this.customer = props.customer
    this.invoiceNumber = props.invoiceNumber
    this.invoiceDate = new Date(props.invoiceDate)
    this.products = props.products.map((product: ProductProps) => new Product(product))
    this.brand = props.brand
    this.bucket = props.bucket
    this.discount = props.discount
    this.invoicePrefix = props.invoicePrefix
    this.invoiceSuffix = props.invoiceSuffix
    this.zeroPrefix = props.zeroPrefix
  }

  get discountAmount() {
    return Number(sumBy(this.products, product => product.discountAmount(this.discount)).toFixed(2))
  }

  get basicAmount() {
    return Number(sumBy(this.products, (product) => product.basicAmount).toFixed(2))
  }

  get taxableAmount() {
    return Number(sumBy(this.products, (product) => product.taxableAmount(this.discount)).toFixed(2))
  }

  get gstAmount() {
    return Number(sumBy(this.products, (product) => product.gstAmount(this.discount)).toFixed(2))
  }

  get finalAmount() {
    return Number(sumBy(this.products, (product) => product.finalAmount(this.discount)).toFixed(2))
  }

  toJSON = () => ({
    ...this,
    basicAmount: this.basicAmount,
    taxableAmount: this.taxableAmount,
    gstAmount: this.gstAmount,
    discountAmount: this.discountAmount,
    finalAmount: this.finalAmount
  })
}