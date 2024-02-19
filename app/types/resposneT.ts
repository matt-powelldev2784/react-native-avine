export interface RepsonseSuccessT {
  success: boolean
  status: number
  message: string
  data: any
}

export interface RepsonseErrorT {
  success: boolean
  status: number
  message: string
}
