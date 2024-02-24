interface AuthErrorT {
  filename: string
}

export const authError = ({ filename }: AuthErrorT) => {
  throw new Error(`User not authenticated at ${filename}`)
}
