const makeId = (length) => {
  let result = ''
  // let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789'
  let charactersLength = characters.length
  for (let i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength))
  return result
}

const getMillisec = () => (new Date().getMilliseconds() + '000').slice(0, 3)

const getDate = () => {
  let d = new Date()
  return `${d.getFullYear()}${('0' + d.getMonth()).slice(-2)}${('0' + d.getDate()).slice(-2)}${(
    '0' + d.getHours()
  ).slice(-2)}${('0' + d.getMinutes()).slice(-2)}`
}

const methods = {
  makeId,
  getMillisec,
  getDate,
  gen: () => {
    let random = makeId(6)
    return `${random.slice(0, 3)}-${getMillisec()}-${random.slice(-3)}`
  },
}

module.exports = { ...methods }
