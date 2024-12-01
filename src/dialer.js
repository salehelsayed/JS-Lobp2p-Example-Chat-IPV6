/* eslint-disable no-console */

import { createLibp2p } from './libp2p.js'
import { stdinToStream, streamToConsole } from './stream.js'
import { multiaddr } from '@multiformats/multiaddr'

async function run() {
  // Create a new libp2p node with both IPv4 and IPv6 addresses
  const dialer = await createLibp2p({
    addresses: {
      listen: [
        '/ip4/0.0.0.0/tcp/0', // Listen on all IPv4 interfaces
        '/ip6/::/tcp/0'       // Listen on all IPv6 interfaces
      ]
    }
  })

  // Output this node's addresses
  console.log('Dialer ready, listening on:')
  dialer.getMultiaddrs().forEach((ma) => {
    console.log(`${ma.toString()}/p2p/${dialer.peerId.toString()}`)
  })

  // Choose either IPv4 or IPv6 localhost address
  // For IPv6 (replace with actual address and peer ID)
  const listenerMultiaddrString = '/ip6/fe80::880:2dbe:fc09:928b/tcp/10333/p2p/12D3KooWC8YUtNoae6ZM2my5Sy1SzuwMdRD8o9R8HmtYxZKz3xJ4'

  // Convert the string to a multiaddr object
  const listenerMultiaddr = multiaddr(listenerMultiaddrString)

  dialer.addEventListener('peer:discovery', (evt) => {
    console.info('peer:discovery', evt.detail)

  // Dial to the remote peer (the "listener")
 
  dialer.dialProtocol(listenerMultiaddr, '/sila7sali7chat/1.0.0')
    .then(stream => {
      console.log('Dialer dialed to listener on protocol: /sila7sali7chat/1.0.0')
      console.log('Type a message and see what happens')
      // Send stdin to the stream
      stdinToStream(stream)
      // Read the stream and output to console
      streamToConsole(stream)
    })
    .catch(err => {
      console.error('Failed to dial:', err)
      })
  })
}

run()
