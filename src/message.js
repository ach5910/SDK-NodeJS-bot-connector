import request from 'superagent'

class Message {

  constructor (options) {
    this.botId = options.botId
    this.apiDomain = options.apiDomain
    this.userSlug = options.userSlug
    this.userToken = options.userToken
    this.senderId = options.senderId
    this.content = options.content
    this.chatId = options.chatId
    this.replies = []
  }

  addReply (json) {
    if (json) {
      this.replies = this.replies.concat(json)
    }
  }

  reply (payload) {
    return new Promise((resolve, reject) => {
      if (payload) {
        this.replies = this.replies.concat(payload)
      }
      request.post(`${this.apiDomain}/users/${this.userSlug}/bots/${this.botId}/conversations/${this.content.conversation}/messages`)
      .set('Authorization', `Token ${this.userToken}`)
      .send({ messages: this.replies, senderId: this.senderId })
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(res)
      })
    })
  }
}

module.exports = Message
