export type Bill = {
  amount: number
  desc: string
}

export type Person = {
  id: number
  name: string
  bills: Bill[]
}
