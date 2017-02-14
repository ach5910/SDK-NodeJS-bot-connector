import Message from './message'
import request from 'superagent'

class Bot {
  constructor (options) {
    this.apiDomain = 'https://api-botconnector.recast.ai'
    this.botId = options.botId
    this.userSlug = options.userSlug
    this.userToken = options.userToken
  }

  listen (req, res) {
    const options = {
      botId: this.botId,
      apiDomain: this.apiDomain,
      senderId: req.body.senderId,
      chatId: req.body.chatId,
      content: req.body.message,
      userSlug: this.userSlug,
      userToken: this.userToken,
    }
    const message = new Message(options)
    this.handler(message)
    if (res && typeof res.sendStatus === 'function') {
      res.sendStatus(200)
    }
  }

  sendMessage (payload, conversation, senderId) {
    return new Promise((resolve, reject) => {
      request.post(`${this.apiDomain}/users/${this.userSlug}/bots/${this.botId}/conversations/${conversation}/messages`)
      .set('Authorization', `Token ${this.userToken}`)
      .send({ messages: [].concat(payload), senderId })
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(res)
      })
    })
  }

  broadcast (payload) {
    return new Promise((resolve, reject) => {
      request.post(`${this.apiDomain}/users/${this.userSlug}/bots/${this.botId}/messages`)
      .set('Authorization', `Token ${this.userToken}`)
      .send({ messages: [].concat(payload) })
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(res)
      })
    })
  }

  onTextMessage (handler) {
    this.handler = handler
  }
}

module.exports = Bot
