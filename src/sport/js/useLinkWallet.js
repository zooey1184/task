
export const useUnlink = () => {
  const isLINK = window.localStorage.getItem('isLINK')
  if (isLINK && isLINK === 'true') {
    return true
  } else {
    return false
  }
}