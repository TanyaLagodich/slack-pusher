import 'dotenv/config';
import HttpApi from './httpApi.js';

class SlackApi extends HttpApi {
  constructor() {
    super({
      baseURL: process.env.SLACK_API,
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
        blocks,
        channel,
      },
    });
  }
}

export default new SlackApi();
