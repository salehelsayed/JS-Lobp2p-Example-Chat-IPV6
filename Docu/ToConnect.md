The listener outputs its multiaddresses along with its Peer ID.
This output will look like:
```
Listener ready, listening on:
/ip4/192.168.46.1/tcp/10333/p2p/12D3KooWFtMBUCfEc1P1irKVWLQPG13iMD9B8zEE64V2QwFrEAx6/p2p/12D3KooWFtMBUCfEc1P1irKVWLQPG13iMD9B8zEE64V2QwFrEAx6
```

 Share the Listener's Multiaddress with the Dialer User
Copy the multiaddress printed by the listener.
Share this multiaddress with the dialer user via a secure channel (e.g., email, messaging app).
Example Multiaddress:
```
/ip4/192.168.46.1/tcp/10333/p2p/12D3KooWFtMBUCfEc1P1irKVWLQPG13iMD9B8zEE64V2QwFrEAx6/p2p/12D3KooWFtMBUCfEc1P1irKVWLQPG13iMD9B8zEE64V2QwFrEAx6
```

Replace 192.168.46.1 with the listener's public IP address.


3` Modify the Dialer to Dial the Listener Directl

Update the dialer's multiaddress to match the listener's multiaddress.

Example Dialer Configuration:
```
/* eslint-disable no-console */

import { createLibp2p } from './libp2p.js'
import { stdinToStream, streamToConsole } from './stream.js'
import { multiaddr } from '@multiformats/multiaddr'

async function run () {
  // Create a new libp2p node on localhost with a randomly chosen port
  const dialer = await createLibp2p({
    addresses: {
      listen: ['/ip4/0.0.0.0/tcp/0']
    }
  })

  // Output this node's address
  console.log('Dialer ready, listening on:')
  dialer.getMultiaddrs().forEach((ma) => {
    console.log(`${ma.toString()}/p2p/${dialer.peerId.toString()}`)
  })

  // The multiaddress of the listener (replace with actual multiaddress)
  const listenerMultiaddr = multiaddr('/ip4/192.168.46.1/tcp/10333/p2p/12D3KooWFtMBUCfEc1P1irKVWLQPG13iMD9B8zEE64V2QwFrEAx6/p2p/12D3KooWFtMBUCfEc1P1irKVWLQPG13iMD9B8zEE64V2QwFrEAx6')

  // Dial to the remote peer (the "listener")
  try {
    const { stream } = await dialer.dialProtocol(listenerMultiaddr, '/sila7sali7chat/1.0.0')
    console.log('Dialer connected to listener on protocol: /sila7sali7chat/1.0.0')
    console.log('Type a message and see what happens')

    // Send stdin to the stream
    stdinToStream(stream)
    // Read the stream and output to console
    streamToConsole(stream)
  } catch (err) {
    console.error('Failed to dial:', err)
  }
}

run()
```