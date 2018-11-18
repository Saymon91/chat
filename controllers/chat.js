const async = require('async');
const { EventEmitter } = require('event');
const _ = require('lodash');

class ChatController extends EventEmitter {
  constructor() {
    super();


  }


}

module.exports = {
  dependencies: [],
  config: {},
  async init({ server,  }, interfaces) {
    return new Promise((resolve, reject) => {
      const module = new ChatController();
    });
  }
}
