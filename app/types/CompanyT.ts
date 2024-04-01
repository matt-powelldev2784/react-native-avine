export interface CompanyT {
  companyName: string
  address: string
  town: string
  county: string
  postcode: string
  contactTel: number
  companyDetailsProvided: boolean
}

export interface CompanyTWithId extends CompanyT {
  emnailed: string
  logo: string
  userId: string
}
