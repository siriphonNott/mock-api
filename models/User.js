const config = require('../configs/app'),
  helper = require('../helpers')

const _this = {
  responseFormat(data) {
    return {
      id: data.id,
      createdDate: helper.date.toDateTime({ _d: data.createdDate, locale: 'en' }),
      username: data.username,
      email: data.email,
      roleId: data.roleId,
      pictureUrl: data.pictureUrl || `${config.baseUrl}/static/images/default-user-avatar.png`,
      isActive: data.isActive,
    }
  },

  toJSON: (data) => (Array.isArray(data) ? data.map((item) => _this.responseFormat(item)) : _this.responseFormat(data)),
}

module.exports = { ..._this }
