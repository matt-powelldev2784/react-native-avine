export interface ResponseSuccessT {
  success: boolean
  status: number
  message: string
  data: any
}

export interface ResponseErrorT {
  success: boolean
  status: number
  message: string
}
