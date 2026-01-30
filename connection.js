const {
  default: makeWASocket,
  useMultiFileAuthState
} = require('@whiskeysockets/baileys')
const Pino = require('pino')

async function connect() {
  const { state, saveCreds } = await useMultiFileAuthState('session')

  const sock = makeWASocket({
    auth: state,
    logger: Pino({ level: 'silent' })
  })

  sock.ev.on('creds.update', saveCreds)

  return sock
}

module.exports = connect
