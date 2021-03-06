require('dotenv').config()
const Discord = require('discord.js')
const bot = new Discord.Client()
const server = require('./connect').Connect
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

bot.commands = new Discord.Collection()

const botCommands = require('./commands')
Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key])
})

bot.login(process.env.DISCORD_TOKEN)

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}`)
})

bot.on('message', msg => {
  const args = msg.content.split(/ +/)
  const command = args.shift().toLowerCase()
  console.info(`Called command: ${command}`)

  if (!bot.commands.has(command)) return

  try {
    bot.commands.get(command).execute(msg, args)
  } catch (error) {
    console.error(error)
    msg.channel.send('ARGH! I had some trouble doin\' what ye asked fer!')
  }
})
