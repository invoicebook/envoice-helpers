import Product from './product'
import {
  InvoiceProductProps
} from './types'

export default class InvoiceProduct extends Product {
  constructor(props: InvoiceProductProps) {
    super(props)
    this.__isDirty = props.dirty || false
    this.__price = props.price
    this.__quantity = props.quantity
    this.__free = props.free    
  }
}
