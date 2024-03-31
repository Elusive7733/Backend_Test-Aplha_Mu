export interface HttpSuccessMessage<T = void> {
  message: string
  statusCode: number
  data?: T
}