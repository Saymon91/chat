(
  function (io, view, serverUrl, userInfo) {

    function Api(baseUrl) {
      this.baseUrl = baseUrl;

      return this;
    }

    Api.prototype.get = function (patch, options, callback) {
      return $.get(this.basePath + path, options, callback);
    };

    Api.prototype.post = function (patch, options, data = null, callback) {
      return $.post(this.basePath + path, options, data, callback);
    };



    function Store() {
      this.stores = {};

      return this;
    }

    Store.prototype.get = function (key) {
      return this.stores[key] ? this.stores[key] : this.stores[key] = [];
    };

    Store.prototype.set = function (key, value) {
      return this.stores[key] = value;
    };

    Store.prototype.add = function (key, value) {
      this.stores[key] ? this.stores[key].push(value) : this.stores[key] = [value];
      return value;
    };

    Store.prototype.length = function (key) {
      return this.stores[key] ? this.stores[key].length : 0;
    };

    Store.prototype.findOne = function (name, condition) {
      return this[store].find(function (item) {
        for (var field in condition) {
          if (item[field] !== condition['field']) {
            return false;
          }
          return true;
        }
      });
    };

    Store.prototype.findAll = function (name, condition) {
      return this[store].filter(function (item) {
        for (var field in condition) {
          if (item[field] !== condition['field']) {
            return false;
          }
          return true;
        }
      });
    };



    function User(id, token, info) {
      this.id = id;
      this.token = token;
      this.info = info;

      this.chats = [];

      return this;
    }

    User.create = function (userInfo) {
      return store.add('users', new User(userInfo.id, userInfo.token || null, userInfo.info, null));
    };

    User.prototype.loadChats = function () {
      this.api.get('user-chats', function (res) {
        for (var index = 0, length = res.length; index < length; index++) {
          var chatInfo = res[index];
          this.chats.push(Chat.create(chatInfo));
        }
      }.bind(this));
    };



    function Message(id, chatId, content, from, to, info = {}) {
      this.id = id;
      this.chatId = chatId;
      this.content = content;
      this.from = from;
      this.to = to;
      this.info = info;

      if (!this.info.createdAt) {
        this.info.createdAt = Date.now();
      }

      return this;
    }

    Message.create = function (messageInfo) {
      return store.add('messages', new Message(messageInfo.id, messageInfo.content, messageInfo.from, messageInfo.to, messageInfo.info));
    };

    Message.prototype.getFrom = function () {
      return store.findOne('users', { id: this.from });
    };

    Message.prototype.getTo = function () {
      return this.to.map(function (to) { return store.findOne('users', to); });
    };

    Message.prototype.getChat = function () {
      return store.findOne('chats', { id: this.chatId });
    };

    Message.prototype.getTopic = function () {
      return this.chatId;
    };

    Message.prototype.serialize = function () {
      return {
        from: user.id,
        to: this.to,
        content: this.content,
        createdAt: this.info.createdAt
      };
    };



    function Chat(id, user, members, messenger) {
      this.id = id;
      this.user = user;
      this.members = members;
      this.messenger = messenger;

      return this;
    }

    Chat.create = function (chatInfo) {
      return store.add('chats', new Chat(chatInfo.id, user, chatInfo.members.map(User.create), store.get('messenger')));
    };

    Chat.prototype.getMessages = function () {
      return store.findAll('messages', { 'chatId': this.id }).sort(function (prev, next) {
        return prev.info.createdAt - next.info.createdAt;
      });
    };

    Chat.prototype.publish = function (content, to = null) {
      to = to || this.members;
      this.messenger.send(Message.create({
        from: this.user.id,
        to: to,
        content: content,
        chatId: this.id
      }));
    };



    function Messenger(client) {
      this.client = client;

      client
        .on('message', this.onMessage.bind(this))
        .on('message:delivered', this.deliveredMessage.bind(this))
        .on('message:sent', this.sentMessage.bind(this));

      return this;
    }

    Messenger.prototype.onMessage = function (message) {
      console.log(message);
      this.client.emit('message:delivered', { messageId: message, userId: user.id, at: Date.now() });
      setTimeout(function () {
        this.client.emit('publish', {})
      }.bind(this), 1000);
    };

    Messenger.prototype.deliveredMessage = function (message) {
      console.log('Message delivered:' + message.id + ':' + message.at + ':' + message.userId);
    };

    Messenger.prototype.sentMessage = function (message) {
      console.log('Message sent' + message.id + ':' + message.at);
    };

    Messenger.prototype.ackMessage = function () {
      console.log('Message acked:' + JSON.stringify(arguments));
    };

    Messenger.prototype.send = function (message) {
      this.client.emit('chat:' + message.getTopic(), message.serialize(), this.ackMessage.bind(this));
    };

    Messenger.prototype.publish = function (topic, to, content) {
      this.commit.emit(topic)
    };

    Messenger.prototype.isConnected = function () {
      return this.client && this.client.connected;
    };

    Messenger.prototype.getChat = function (chatId) {
      return store.findOne('chats', { id: chatId });
    };

    Messenger.prototype.getUser = function (userId) {
      return store.findOne('users', { id: userId });
    };

    Messenger.prototype.init = function (io, user) {
      this.client = io(serverUrl);
    };



    var store = new Store();
    var user = store.set('user', new User(userInfo.id, userInfo.token, userInfo.info));
    var socket = io(serverUrl);
    socket.on('connect', function () {
      var messenger = store.set('messenger', new Messenger(socket));
      user.loadChats();
    });

  }(window.io, $('chat-root'), 'https://test16.bbp.tools', { id: 19376, token: 'test' })
)