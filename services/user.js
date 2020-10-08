const tableName = 'mm_backend_users',
  jwt = require('../configs/jwt')

module.exports = ({ connection, scopeSearch, newError, toJSON, helper }) => {
  return {
    find(req) {
      let sql = `SELECT * FROM ${tableName}`
      sql = scopeSearch(sql, req)
      return new Promise(async (resolve, reject) => {
        try {
          let [results] = await connection.query(sql)
          resolve(toJSON(results))
        } catch (error) {
          reject(newError(error))
        }
      })
    },

    findById(id) {
      return new Promise(async (resolve, reject) => {
        try {
          let [results] = await connection.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id])
          if (results.length < 1) {
            return reject(newError('user id: not found', 404))
          }
          resolve(toJSON(results[0]))
        } catch (error) {
          reject(newError(error))
        }
      })
    },

    insert(data) {
      data.password = helper.hash.passwordHash(data.password)
      delete data.roleId
      return new Promise(async (resolve, reject) => {
        try {
          await connection.query(`INSERT INTO ${tableName} SET ?`, data)
          resolve({ msg: 'inserted success' })
        } catch (error) {
          reject(newError(error))
        }
      })
    },

    update(id, data) {
      delete data.password
      return new Promise(async (resolve, reject) => {
        try {
          let [results] = await connection.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id])
          if (results.length < 1) {
            return reject(newError('id: not found', 404))
          }
          await connection.query(`UPDATE ${tableName} SET ? WHERE id=?`, [data, id])
          resolve({ msg: 'updated success' })
        } catch (error) {
          reject(newError(error))
        }
      })
    },

    delete(id) {
      return new Promise(async (resolve, reject) => {
        try {
          let [results] = await connection.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id])
          if (results.length < 1) {
            return reject(newError('id: not found', 404))
          }
          await connection.query(`UPDATE ${tableName} SET isActive = 0 WHERE id = ?`, [id])
          resolve({ msg: 'deleted success' })
        } catch (error) {
          reject(newError(error))
        }
      })
    },

    login(data) {
      return new Promise(async (resolve, reject) => {
        try {
          let [results] = await connection.query(`SELECT * FROM ${tableName} WHERE username = ?`, [data.username])
          if (results.length < 1) {
            return reject(newError('username not found', 401))
          }
          const userLogin = results[0]

          if (!helper.hash.validPassword(data.password || '', userLogin.password)) {
            return reject(newError('password is invalid.', 401))
          }

          resolve({ accessToken: jwt.generateJWT({ userObj: userLogin }), userData: toJSON(userLogin) })
        } catch (error) {
          reject(newError(error))
        }
      })
    },

    refreshToken(accessToken) {
      return new Promise(async (resolve, reject) => {
        try {
          let decoded = jwt.decode(accessToken)
          console.log(decoded)
          let [results] = await connection.query(`SELECT * FROM ${tableName} WHERE username = ?`, [decoded.id])
          const userLogin = results[0]
          if (results.length < 1) {
            return reject(newError('username not found', 401))
          }
          resolve({ accessToken: jwt.generateJWT({ userObj: userLogin }), userData: toJSON(userLogin) })
        } catch (error) {
          reject(newError(error))
        }
      })
    },

    changePasword(req) {
      return new Promise(async (resolve, reject) => {
        try {
          let [userData] = await connection.query(`SELECT * FROM ${tableName} WHERE id = ?`, [req.user.id])

          if (userData.length > 0) {
            let user = userData[0]

            if (helper.hash.validPassword(req.body.oldPassword, user.password)) {
              let newPassword = helper.hash.passwordHash(req.body.newPassword)

              await connection.query(`UPDATE ${tableName} SET password = ? WHERE id = ?`, [newPassword, req.user.id])
              return resolve({ message: 'changed password' })
            } else {
              reject(newError('old password incorrect', 422))
            }
          } else {
            reject(newError('user not found', 401))
          }
        } catch (error) {
          reject(newError(error))
        }
      })
    },
  }
}
