require('dotenv').config()
const server = require('../connect').Connect
// const PirateBay = require('thepiratebay')

module.exports = {
  name: '!add',
  description: 'Add a Torrent',
  execute (msg, args) {
    const url = args[0]
    // if (url.includes('https://thepiratebay.org')) {
    //   const pirateBayListing = await PirateBay.getTorrent(url.replace(/^\D+/g, ''))
    //   console.info(pirateBayListing)
    // }
    server.addUrl(url, (err, result) => {
      if (err) {
        console.error(err)
        msg.channel.send('`[sad pirate noise]` There was a problem adding your torrent URL')
        return false
      }
      // console.info(result)
      const { name } = result
      msg.channel.send(`Successfully added ${name}`)
    })
  }
}
