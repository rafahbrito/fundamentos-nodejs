import http from 'node:http'

const server = http.createServer((req, res) => {
  return res.end('Hello World')
})

server.listen(3333, () => {
  console.log('Server is running on port 3333')
})
