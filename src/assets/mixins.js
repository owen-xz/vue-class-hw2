const token = document.cookie
  .split('; ')
  .find((row) => row.startsWith('hexToken='))
  ?.split('=')[1]
export const config = {
  headers: { Authorization: token },
}