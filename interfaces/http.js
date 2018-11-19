const http = require('http');
const https = require('https');
const express = require('express');
const { EventEmitter } = require('events');
const uuid = require('uuid');

class Server extends EventEmitter {
  constructor() {
    super();

    this.app = express();

    this.stores = {};
  }

  async init(redis) {

  }
}

module.exports = {
  dependencies: {
    interfaces: {
      'redis:exclusive': {
        options: { db: 1 } //TODO: move to config
      }
    }
  },
  async init() {
    return new Promise((resolve, reject) => {
      const app = express();

      resolve(app)
    });
  }
};