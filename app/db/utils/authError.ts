export const authError = () => {
  return {
    success: false,
    status: 401,
    message: 'User not authenticated',
  }
}
