import pick from 'lodash.pick'
import {
  ProductProps
} from './types'
import { uniqueId } from './utils'

export default class Product {
  _id: string
  name: string
  price?: number
  quantity: number
  gst: number
  hsncode: string
  mrp?: number
  reference?: any
  free?: number
  unit?: any

  uuid?: any

  __isDirty?: boolean
  __price?: number
  __quantity?: number
  __free?: number

  constructor(props: ProductProps) {
    this._id = props._id
    this.name = props.name
    this.price = props.price
    this.quantity = props.quantity
    this.mrp = props.mrp
    this.reference = props.reference || ''
    this.gst = props.gst || 0
    this.hsncode = props.hsncode || ''
    this.free = props.free
    this.unit = props.unit || 'kg(s)'

    this.uuid = uniqueId()
  }

  get basicAmount() {
    return Number((this.price * this.quantity).toFixed(2))
  }

  get netAmount() {
    let { gst, price } = this
    let basic = Number((price * 1).toFixed(2))
    let _gst = 0
    if (gst) _gst = gst / 100
    let gstAmount = Number((basic * _gst).toFixed(2))
    return Number((basic + gstAmount).toFixed(2)).toFixed(2)
  }

  discountAmount = (discount: number) => {
    let basic = this.basicAmount
    let cd = 0
    if (discount) cd = discount / 100
    return Number((basic * cd).toFixed(2))
  }

  taxableAmount = (discount: number) => {
    let basic = this.basicAmount
    let cd = 0
    if (discount) cd = discount / 100
    return Number((basic - (basic * cd)).toFixed(2))
  }

  gstAmount = (discount: number) => {
    let taxableAmount = this.taxableAmount(discount)
    let { gst } = this
    let _gst = 0
    if (gst) _gst = gst / 100
    return Number((taxableAmount * _gst).toFixed(2))
  }

  finalAmount = (discount: number) => {
    let finalAmount = this.taxableAmount(discount) + this.gstAmount(discount)
    return Number(finalAmount.toFixed(2))
  }

  toJSON = (fields: Array<string>) => pick(this, fields)
}
