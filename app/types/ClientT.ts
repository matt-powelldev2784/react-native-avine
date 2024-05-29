export interface ClientT {
  name: string
  companyName?: string
  address: string
  town: string
  county: string
  postcode: string
  contactTel: string | number
  notes: string | null
  isDeleted: boolean
}

export interface ClientWithIdT extends ClientT {
  id: string
}
