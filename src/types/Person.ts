export type Bill = {
  amount: number
  desc: string
}

export type Person = {
  id: number
  name: string
  bills: Bill[]
  totalPaid: number
}

export type Transfer = {
  from: string
  fromId: number
  to: string
  toId: number
  amount: number
}
