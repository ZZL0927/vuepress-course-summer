export function generateOk<T>(data?: T) {
  return {
    stat: 'ok',
    data
  }
}