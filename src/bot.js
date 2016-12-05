import Message from './message'
import request from 'superagent'

class Bot {

  constructor(options) {
    this.apiDomain = options.apiDomain
    this.botId = options.botId
    this.replies = []
  }

  listen(req) {
    const options = {
      botId: this.botId,
      apiDomain: this.apiDomain,
      senderId: req.body.senderId,
      chatId: req.body.chatId,
      content: req.body.message,
    }
    const message = new Message(options)
    this.handler(message)
  }

  broadcast(payload) {
    return new Promise((resolve, reject) => {
      if (payload) {
        this.replies.push(payload)
      }
      request.post(`${this.apiDomain}/bots/${this.botId}/messages`)
      .send({ messages: this.replies })
      .end((err, res) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(res)
        }
      })
    })
  }

  onTextMessage(handler) {
    this.handler = handler
  }
}

module.exports = Bot
