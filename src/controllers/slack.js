import 'dotenv/config';
import SlackApi from '../api/slack.js';
import logger from '../logger.js';

class SlackController {
  async sendMessageToChannel(data) {
    try {
      const channel = await this.getCurrentChannel(process.env.SLACK_CHANNEL_NAME);
      await SlackApi.sendNewMessage({
        channel: channel.id,
        blocks: JSON.stringify(data),
      });
    } catch (err) {
      logger.log('error', err);
    }
  }

  async pushInSlack(tasks) {
    try {
      const { id } = await this.getCurrentChannel(process.env.SLACK_CHANNEL_NAME);
      const { data: { messages } } = await SlackApi.getAllMessages({ channel: id });

      tasks.forEach((task) => {
        const message = messages.find((msg) => msg.text.includes(task.name));
        if (message) {
          this.addMessageToThread({
            channel: process.env.SLACK_CHANNEL_NAME,
            thread_ts: message.ts,
            text: `<!here>`,
          });
        }
      });
    } catch (err) {
      logger.log('error', err);
    }
  }

  async addMessageToThread({ channel, thread_ts, text }) {
    try {
      await SlackApi.addMessageToThread({ channel, thread_ts, text });
    } catch (err) {
      logger.log('error', err);
    }
  }

  async getCurrentChannel(channelName) {
    try {
      const { data: { channels }} = await SlackApi.getConversationList({ types: 'private_channel' });
      return channels.find((channel) => channel.name === channelName);
    } catch (err) {
      logger.log('error', err);
    }
  }
}

export default new SlackController();
