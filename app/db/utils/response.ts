import { RepsonseErrorT, RepsonseSuccessT } from '../../types/resposneT'

export const responseSuccess = ({
  success,
  status,
  message,
  data,
}: RepsonseSuccessT) => {
  return {
    success,
    status,
    message,
    data,
  }
}

export const responseError = ({ success, status, message }: RepsonseErrorT) => {
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
