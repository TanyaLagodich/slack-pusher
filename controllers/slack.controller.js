const SlackApi = require('../api/slack');

class SlackController {
    async sendMessageToChannel(data) {
        console.log({ data });
        const channel = await this.getCurrentChannel('grp-front-mr');
        console.log({ channel });
        await SlackApi.sendNewMessage({
            channel: channel.id,
            text: 'test',
        });
    }

    async getCurrentChannel(channelName) {
        const conversations = await SlackApi.getConversationList({ types: 'private_channel' });
        return conversations.find((conversation) => conversation.name === channelName);
    }
}

module.exports = SlackController;