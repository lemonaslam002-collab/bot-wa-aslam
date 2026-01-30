const fs = require('fs')
const { createSticker } = require('./sticker')
const { prefix } = require('./config')

async function handler(sock, msg) {
  const text = msg.message?.conversation || ''
  if (!text.startsWith(prefix)) return

  const command = text.slice(1).trim()

  if (command === 'sticker') {
    if (!msg.message.imageMessage && !msg.message.videoMessage) return

    const media = await sock.downloadMediaMessage(msg)
    fs.writeFileSync('input', media)

    await createSticker('input', 'output.webp')

    await sock.sendMessage(msg.key.remoteJid, {
      sticker: fs.readFileSync('output.webp')
    })

    fs.unlinkSync('input')
    fs.unlinkSync('output.webp')
  }
}

module.exports = handler
