require('dotenv').config()
const server = require('../connect').Connect

module.exports = {
  name: '!remove',
  description: 'Remove an active Torrent',
  execute (msg, args) {
    const id = Number.parseInt(args[0])
    server.remove(id, (err, result) => {
      if (err) {
        console.error(err)
        msg.channel.send('I couldn\'t stop that Torrent. I think we\'re gonna need a bigger boat')
        return false
      }
      console.info({ id, result })
      msg.channel.send('I\'ve deleted that torrent')
    })
  }
}
