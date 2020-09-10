require('dotenv').config()
const server = require('../connect').Connect

module.exports = {
  name: '!resume',
  description: 'Resume an active Torrent',
  execute (msg, args) {
    const id = Number.parseInt(args[0])
    server.start(id, (err, result) => {
      if (err) {
        console.error(err)
        msg.channel.send('I couldn\'t stop that Torrent. I think we\'re gonna need a bigger boat')
        return false
      }
      msg.channel.send('I\'ve resumed transmission and recieving of The Goods')
    })
  }
}
