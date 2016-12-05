import request from 'superagent'

class Message {

  constructor(options) {
    this.botId = options.botId
    this.apiDomain = options.apiDomain
    this.senderId = options.senderId
    this.content = options.content
    this.chatId = options.chatId
    this.replies = []
  }

  addReply(json) {
    if (json) {
      this.replies.push(json)
    }
  }

  reply(payload) {
    return new Promise((resolve, reject) => {
      if (payload) {
        this.replies.push(payload)
      }
      request.post(`${this.apiDomain}/bots/${this.botId}/conversations/${this.content.conversation}/messages`)
      .send({ messages: this.replies, senderId: this.senderId })
      .end((err, res) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(res)
        }
      })
    })
  }
}

module.exports = Message
