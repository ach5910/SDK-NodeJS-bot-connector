# SDK-NodeJS-bot-connector

[logo]: https://camo.githubusercontent.com/619c851714395ac0957dd5a2bdf08dd4aefe0469/68747470733a2f2f63646e2e7265636173742e61692f626f742d636f6e6e6563746f722f626f742d636f6e6e6563746f722d6c6f676f2e706e67 "bot connector"

![alt text][logo]

Recast.AI official SDK in Node.js for bot connector

## Synospis

This module is a wrapper around the [Bot connector](https://botconnector.recast.ai) API, and allows you to connect your bot to any channels

## Installation

```bash
npm install --save recastai-botconnector
```

## Usage

#### Catch and reply

```js
const Bot = require('recastai-botconnector')
const express = require('express')
const bodyParser = require('body-parser')

/* server setup */
const app = express()

app.set('port', 5000)
app.use(bodyParser.json())
app.post('/', (req, res) => myBot.listen(req, res))
app.listen(app.get('port'), () => console.log('Bot running on port', app.get('port')))

/* setup bot */
const myBot = new Bot({ botId: 'YOUR BOT ID', userSlug: 'YOUR USER SLUG', userToken: 'YOUR USER TOKEN' })

/* on new message */
myBot.onTextMessage(message => {
  console.log(message)
  const text = {
    type: 'text',
    content: 'Here is a reply!',
  }

  message.reply(text)
  .then(() => console.log('Message successfully sent'))
  .catch(err => console.log(`Error while sending message: ${err}`))
})
```

#### Push a message to one participant

```js
const payload = {
  type: 'text',
  content: 'Here is your pushed message',
}

myBot.sendMessage(payload, conversationId, recipient)
.then(() => console.log('Message successfully sent'))
.catch(err => console.log(`Error while sending message: ${err}`))
```

#### Broadcast a message to all participants

```js
const payload = {
  type: 'text',
  content: 'Here is a broadcast message',
}

myBot.broadcast(payload)
.then((res) => {
  console.log(res)
})
```

## Documentation

You can find the full documentation [here](https://github.com/RecastAI/SDK-NodeJS-bot-connector/wiki).

## Specs

This module contains 2 classes, as follows:

* [Bot](https://github.com/RecastAI/SDK-NodeJS-bot-connector/wiki/Class-Bot) is the client allowing you to catch messages sent to your bot
* [Message](https://github.com/RecastAI/SDK-NodeJS-bot-connector/wiki/Class-Message) is the class used for replies.

## More

You can view the whole API reference at [man.recast.ai](https://man.recast.ai).

## Author

Bruno Gantelmi, bruno.gantelmi@recast.ai

You can follow us on Twitter at [@recastai](https://twitter.com/recastai) for updates and releases.

## License

Copyright (c) [2016] [Recast.AI](https://recast.ai)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
