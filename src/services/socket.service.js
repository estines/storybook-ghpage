import io from 'socket.io-client'

console.log('should be connect to socket.io server')
const socket = io('http://192.168.42.244:3000', {
  transports: ['websocket']
})
socket.emit('channel1', 'Hi server')
socket.emit('ping', { message: 'pong' })
socket.emit('connect')
socket.on('connect', () => {
  console.log('socket connected...')
})

const subscribe = room => {

}

export default socket
