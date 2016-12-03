const Hapi = require('hapi')
const Inert = require('inert')
const Handlebars = require('handlebars')
const Vision = require('vision')

const port = process.PORT || 4000

const server = new Hapi.Server()

server.connection({ port })

server.register([Inert, Vision], err => {
  if (err) throw err

  server.views({
    engines: { html: Handlebars },
    relativeTo: __dirname,
    path: 'templates'
  })

  server.route({
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: '../assets',
        redirectToSlash: true,
        index: false
      }
    }
  })
})

module.exports = server;