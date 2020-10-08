const moment = require('moment')
const YEAR_AD = 543

const methods = {
  toDate({ _d, locale = 'en', isShortness = false, format } = {}) {
    if (!_d) return ''
    let _format, _moment
    _moment = moment.isMoment(_d) ? _d : moment(_d)
    _format = format ? format : isShortness ? 'DD MMM YYYY' : 'DD MMMM YYYY'
    try {
      return _moment
        .locale(locale)
        .add(locale == 'th' ? YEAR_AD : 0, 'years')
        .format(_format)
    } catch (error) {
      return ''
    }
  },

  toDateTime({ _d, locale = 'en', isShortness = false, format } = {}) {
    if (!_d) return ''
    let _format, _moment
    _moment = moment.isMoment(_d) ? _d : moment(_d)
    _format = format ? format : isShortness ? 'DD MMM YYYY HH:mm' : 'DD MMMM YYYY HH:mm'
    try {
      return _moment
        .locale(locale)
        .add(locale == 'th' ? YEAR_AD : 0, 'years')
        .format(_format)
    } catch (error) {
      return ''
    }
  },

  getID() {
    return moment.format('YYYYMMDDHHmmss')
  },
}

module.exports = { ...methods }
