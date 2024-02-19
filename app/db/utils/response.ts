interface repsonseSuccessT {
  success: boolean
  status: number
  message: string
  data: any
}

interface repsonseErrorT {
  success: boolean
  status: number
  message: string
}

export const responseSuccess = ({
  success,
  status,
  message,
  data,
}: repsonseSuccessT) => {
  return {
    success,
    status,
    message,
    data,
  }
}

export const responseError = ({ success, status, message }: repsonseErrorT) => {
  return {
    success,
    status,
    message,
  }
}

export const authError = () => {
  return responseError({
    success: false,
    status: 401,
    message: 'User not authenticated',
  })
}
