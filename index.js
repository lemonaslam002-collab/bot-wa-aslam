const connect = require('./connection')
const handler = require('./handler')

async function start() {
  const sock = await connect()

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return
    await handler(sock, msg)
  })
}

start()
