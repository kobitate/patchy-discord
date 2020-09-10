const Transmission = require('transmission')

const Connect = new Transmission({
  host: process.env.TRANSMISSION_HOST,
  port: process.env.TRANSMISSION_PORT,
  username: process.env.TRANSMISSION_USER,
  password: process.env.TRANSMISSION_PASSWORD,
  url: process.env.TRANSMISSION_PATH
})

module.exports = {
  Connect
}
