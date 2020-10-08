const fs = require('fs')

let rawdata = fs.readFileSync('MOCK_DATA.json')
let data = JSON.parse(rawdata)
let page = 1
let limit = 2

page = (1 - 1) * limit

let queryResult = data.slice(page, limit)

let res = {
  total: queryResult.length,
  currPage: 1,
  limit: 10,
  rows: queryResult,
}

console.log(res)
