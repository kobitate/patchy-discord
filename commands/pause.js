require('dotenv').config()
const server = require('../connect').Connect

module.exports = {
  name: '!pause',
  description: 'Pause an active Torrent',
  execute (msg, args) {
    const id = Number.parseInt(args[0])
    server.stop(id, (err, result) => {
      if (err) {
        console.error(err)
        msg.channel.send('I couldn\'t stop that Torrent. I think we\'re gonna need a bigger boat')
        return false
      }
      msg.channel.send('I\'ve stopped transmission and recieving of The Goods')
    })
  }
}
