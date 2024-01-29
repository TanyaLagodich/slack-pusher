const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const SlackApi = require('../api/slack');
const generateContent = require("../utils/generetaContent");

class SlackController {
    async sendMessageToChannel(data) {
        const channel = await this.getCurrentChannel('grp-front-mr');
        await SlackApi.sendNewMessage({
            channel: channel.id,
            blocks: generateContent(data),
        });
    }

    async getCurrentChannel(channelName) {
        const conversations = await SlackApi.getConversationList({types: 'private_channel'});
        return conversations.find((conversation) => conversation.name === channelName);
    }
}

module.exports = SlackController;