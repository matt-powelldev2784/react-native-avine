import { ResponseErrorT, ResponseSuccessT } from '../../types/resposneT'

export const responseSuccess = ({
  success,
  status,
  message,
  data,
}: ResponseSuccessT) => {
  return {
    success,
    status,
    message,
    data,
  }
}

export const responseError = ({ success, status, message }: ResponseErrorT) => {
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
