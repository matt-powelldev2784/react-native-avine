import { repsonseErrorT, repsonseSuccessT } from '../../types/resposneT'

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
