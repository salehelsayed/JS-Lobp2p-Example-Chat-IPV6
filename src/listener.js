/* eslint-disable no-console */

import { createLibp2p } from './libp2p.js'
import { stdinToStream, streamToConsole } from './stream.js'

async function run() {
  // Create a new libp2p node listening on all interfaces
  const listener = await createLibp2p({
    addresses: {
      listen: [
        '/ip4/0.0.0.0/tcp/10333', // Listen on all IPv4 interfaces
        '/ip6/::/tcp/10333'       // Listen on all IPv6 interfaces
      ]
    }
  })

  // Output listen addresses to the console with Peer ID
  console.log('Listener ready, listening on:')
  listener.getMultiaddrs().forEach((ma) => {
    console.log(`${ma.toString()}/p2p/${listener.peerId.toString()}`)
  })

  // Log a message when a remote peer connects to us
  listener.addEventListener('peer:connect', (evt) => {
    const remotePeer = evt.detail
    console.log('Connected to:', remotePeer.toString())
  })

  // Handle messages for the protocol
  await listener.handle('/sila7sali7chat/1.0.0', async ({ stream }) => {
    // Send stdin to the stream
    stdinToStream(stream)
    // Read the stream and output to console
    streamToConsole(stream)
  })

  // Output listen addresses to the console
  console.log('Listener ready, listening on:')
  listener.getMultiaddrs().forEach((ma) => {
    console.log(ma.toString())
  })
}

run()