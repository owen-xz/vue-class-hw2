const getToken = () => {
  return document.cookie
  .split('; ')
  .find((row) => row.startsWith('hexToken='))
  ?.split('=')[1]
}
export const getConfig = () => {
  return {
    headers: { Authorization: getToken() },
  }
}