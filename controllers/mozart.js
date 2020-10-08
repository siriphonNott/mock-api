const fs = require('fs')
const rawdata = fs.readFileSync('MOCK_DATA.json')
const dataMock = JSON.parse(rawdata)
const config = require('../configs/app')

module.exports = ({ Service }) => {
  let _this = {
    async onGetAll(req, res) {
      try {
        let page = req.query.page
        let limit = req.query.limit
        let result = _this.paginate({
          data: dataMock,
          page,
          limit,
        })
        res.send(result)
      } catch (error) {
        res.status(500).send(error)
      }
    },
    paginate({ data, page, limit } = {}) {
      let _page = (page - 1) * (limit || config.limitPage)
      limit = limit * page
      let rows = data.slice(_page, limit)
      return {
        total: rows.length,
        rows: rows,
        currPage: +page,
        limit: limit,
      }
    },
  }
  return _this
}
