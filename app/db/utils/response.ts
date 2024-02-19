import { ResponseT } from '../../types/resposneT'

export const responseSuccess = ({
  success,
  status,
  message,
  data,
}: ResponseT) => {
  return {
    success,
    status,
    message,
    data,
  }
}

export const responseError = ({ success, status, message }: ResponseT) => {
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
