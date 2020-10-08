const config = require('../configs/app'),
      jwt = require('jsonwebtoken') 

const generateJWT = ({userObj, minutes, hours, days}) => {
  let today = new Date(),
  exp = new Date(today)
  
  if(minutes){
    exp.setMinutes(today.getMinutes() + minutes);
  } else if(hours){
    exp.setHours(today.getHours() + hours);
  } else if(days){
    exp.setDate(today.getDate() + days);
  } else {
    exp.setMinutes(today.getMinutes() + 30);
  }

  return jwt.sign({
    id: userObj.id,
    username: userObj.username,
    email: userObj.email,
    exp: parseInt(exp.getTime() / 1000),
    }, config.secret)
}
  
module.exports = {
  ...jwt,
  generateJWT
}