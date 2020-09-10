require('dotenv').config()
const server = require('../connect').Connect
const { MessageEmbed } = require('discord.js')

const statusCode = [
  'Stopped',
  'Queued to check files',
  'Checking files',
  'Queued to Download',
  'Downloading',
  'Queued to seed',
  'Seeding',
  'Couldn\'t find peers'
]

module.exports = {
  name: '!status',
  description: 'List all torrents',
  execute (msg) {
    server.active((err, status) => {
      if (err) {
        console.error(err)
        msg.channel.send(':(')
      }
      const { torrents } = status
      if (torrents.length === 0 || !torrents) {
        msg.channel.send('No active torrents at the moment')
      }
      torrents.forEach(torrent => {
        const embeds = new MessageEmbed()
          .setTitle(`${torrent.id}) ${torrent.name}`)
          .setTimestamp(new Date(torrent.addedDate * 1000))
          .addField('Percent Complete', `${torrent.percentDone * 100}%`, true)
          .addField('Status', statusCode[torrent.status], true)
        if (torrent.status === 6 || torrent.status === 0) {
          embeds.addField('Seed Ratio', torrent.uploadRatio, true)
        }
        msg.channel.send(embeds)
      })
    })
  }
}
