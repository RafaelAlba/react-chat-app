'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Message = require('./src/models/message');
const mongoose = require('mongoose');


const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, './app')
      }
    }
  }
});


server.connection({
    host: '0.0.0.0',
    port: process.env['PORT']
});


server.register(
  [
    {
      'register': require('good'),
      'options': {
        'ops': {
          'interval': 1000
        },
        'reporters': {
          'myConsoleReporter': [
            {
              'module': 'good-squeeze',
              'name': 'Squeeze',
              'args': [{ 'log': '*', 'response': '*', 'connection': '*', 'request': '*' }]
            },
            {'module': 'good-console'},
            'stdout'
          ]
        }
      }
    },
    {'register': require('hapi-error'), 'options': {}},
    {'register': require('vision'), 'options': {}},
    {'register': require('inert'), 'options': {}},
  ],
  function (err) {
    if (err) {
      throw new Error('Cannot register plugins');
    }
  }
);

server.views({
  engines: {pug: require('pug')},
  path: __dirname + '/app/views',
  compileOptions: {pretty: true},
  layout: false
});


server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: '.',
      redirectToSlash: true,
      index: true
    }
  }
});


server.route({
  method: 'GET',
  path: '/',
  handler: function (req, reply) {
    return reply.view('homepage')
  }
});


server.route({
  method: 'GET',
  path: '/blog',
  handler: function (req, reply) {
    return reply.view('blog')
  }
});


server.route({
  method: 'GET',
  path: '/messages',
  handler: function (req, reply) {
    Message.find({}, function(err, messages){
      if (err) {
        reply(err)
      }

      reply(messages)
    });
  }
});


mongoose.connect('mongodb://mongodbhost/react');

server.start(function(err) {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
