const QRCode = require('qrcode')

const options = {
  width: 500,
}

module.exports = {
  genQrcodeUrl(text) {
    return new Promise((resolve, reject) => {
      QRCode.toDataURL(text, options, function (err, url) {
        if (err) reject(err)
        resolve(url)
      })
    })
  },
}
