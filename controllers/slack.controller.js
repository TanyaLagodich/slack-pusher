require('dotenv').config();
const SlackApi = require('../api/slack');
const generateContent = require('../utils/generetaContent');

class SlackController {
  async sendMessageToChannel(data) {
    const channel = await this.getCurrentChannel(process.env.SLACK_CHANNEL_NAME);
    await SlackApi.sendNewMessage({
      channel: channel.id,
      blocks: generateContent(data),
    });
  }

  async getCurrentChannel(channelName) {
    const conversations = await SlackApi.getConversationList({ types: 'private_channel' });
    return conversations.find((conversation) => conversation.name === channelName);
  }
}

module.exports = SlackController;
