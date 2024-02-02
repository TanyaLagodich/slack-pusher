require('dotenv').config();
const HttpApi = require('./httpApi');

const SLACK_API = 'https://slack.com/api/';

class SlackApi extends HttpApi {
  constructor() {
    super({
      baseURL: SLACK_API,
      headers: {
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      },
    });
  }

  getConversationList({ types }) {
    return this.get({ endpoint: 'conversations.list', params: { types } });
  }

  getAllMessages({ channel }) {
    return this.get({ endpoint: 'conversations.history', params: { channel } });
  }

  addMessageToThread({ channel, thread_ts, text }) {
    return this.post({ endpoint: 'chat.postMessage', data: { channel, thread_ts, text } });
  }

  sendNewMessage({ channel, blocks }) {
    return this.post({
      endpoint: 'chat.postMessage',
      data: {
        blocks: JSON.stringify(blocks),
        channel,
      },
    });
  }
}

module.exports = new SlackApi();
