export interface ClientT {
  name: string
  address: string
  town: string
  postcode: string
  contactTel: number
  notes: string | null
  isDeleted: boolean
}

export interface ClientWithIdT extends ClientT {
  id: string
}
