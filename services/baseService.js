const connection = require('../configs/databases'),
  config = require('../configs/app'),
  logger = require('../configs/logger'),
  helper = require('../helpers')

const baseMethods = {
  newError(msg, status = 500, code) {
    let error = new Error(msg)
    error.status = status
    if (code) error.code = code
    return error
  },

  cleanEmpty(data) {
    let obj = {}
    Object.keys(data).forEach((v) => {
      if (data[v] != null && data[v] != undefined) obj[v] = data[v]
    })
    return obj != {} ? obj : null
  },

  scopeSearchAdvance(searches = '') {
    if (!searches) return ''
    searches = JSON.parse(searches)
    let where = []

    Object.keys(searches).forEach((field) => {
      let type = searches[field].type || '',
        value = searches[field].value

      switch (type.toLowerCase()) {
        case 'eq':
          where.push(`${field} =  ${connection.escape(value)}`)
          break
        case 'gt':
          where.push(`${field} >  ${connection.escape(value)}`)
          break
        case 'gte':
          where.push(`${field} >= ${connection.escape(value)}`)
          break
        case 'in':
          where.push(`${field} IN (${connection.escape(JSON.parse(value))})`)
          break
        case 'lt':
          where.push(`${field} <  ${connection.escape(value)}`)
          break
        case 'lte':
          where.push(`${field} <= ${connection.escape(value)}`)
          break
        case 'ne':
          where.push(`${field} != ${connection.escape(value)}`)
          break
        case 'nin':
          where.push(`${field} NOT IN (${connection.escape(JSON.parse(value))})`)
          break
        case 'like':
          where.push(`${field} LIKE ${connection.escape('%' + value + '%')}`)
          break
        case 'null':
          where.push(`${field} IS NULL`)
          break
        case 'nn':
          where.push(`${field} IS NOT NULL`)
          break
        case 'btw':
          let arr = JSON.parse(value)
          where.push(`${field} BETWEEN ${connection.escape(arr[0])} AND ${connection.escape(arr[1])}`)
          break
        default:
          break
      }
    })
    return where.length > 0 ? `(${where.join(' OR ')})` : ''
  },

  // Pagination
  paginate(sql, params, toJSON) {
    let sqlTotal = baseMethods.paginateSql(sql)
    return new Promise(async (resolve, reject) => {
      let [data, totalRecord] = await Promise.all([await connection.query(sql), await connection.query(sqlTotal)])
      let total = totalRecord[0].length > 0 ? totalRecord[0][0].total : 0

      resolve({
        total: total,
        currentPage: +params.page || 0,
        lastPage: +Math.ceil(total / params.limit) || 0,
        rows: toJSON ? await toJSON(data[0]) : data[0],
      })
    })
  },

  paginateSql(sql) {
    let newSql = sql.toLowerCase().split('from')[1]
    let where = newSql.toLowerCase().split('limit')[0]
    return `SELECT count(*) as total FROM ${where}`
  },

  // Including Filtering, sorting, paging
  scopeSearch(sql, params) {
    let where = []
    let searchAdvance = baseMethods.scopeSearchAdvance(params.searchAdvance)
    Object.keys(params)
      .filter((v) => !['sort', 'limit', 'page', 'searchAdvance'].includes(v) && params[v])
      .forEach((v) => where.push(`${v} = ${connection.escape(params[v])}`))
    if (where.length > 0) {
      sql += ` WHERE ${where.join(' AND ')}`
    }
    if (searchAdvance) {
      sql += ` ${where.length > 0 ? 'AND' : 'WHERE'} ${searchAdvance}`
    }
    if (params.sort) {
      let sort = params.sort.split(':')
      sql += ` ORDER BY ${sort[0]} ${sort[1]}`
    }
    if (params.limit && params.page) {
      let limitPage = params.limit || config.limitPage
      let startPage = ((params.page || 1) - 1) * limitPage
      sql += ` LIMIT ${connection.escape(startPage)},${limitPage}`
    }
    return sql
  },

  escape(string) {
    return connection.escape(string)
  },
}

module.exports = {
  connection,
  config,
  logger,
  helper,
  ...baseMethods,
}
