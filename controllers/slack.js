require('dotenv').config();
const SlackApi = require('../api/slack');
const generateContent = require('../utils/generetaContent');
const logger = require("../logger");

class Slack {
  async sendMessageToChannel(data) {
    try {
      const channel = await this.getCurrentChannel(process.env.SLACK_CHANNEL_NAME);
      await SlackApi.sendNewMessage({
        channel: channel.id,
        blocks: generateContent(data),
      });
    } catch (err) {
      logger.log('error', JSON.stringify(err));
    }
  }

  async getCurrentChannel(channelName) {
    try {
      const conversations = await SlackApi.getConversationList({ types: 'private_channel' });

      return conversations.find((conversation) => conversation.name === channelName);
    } catch (err) {
      logger.log('error', JSON.stringify(err));
    }
  }
}

module.exports = Slack;
