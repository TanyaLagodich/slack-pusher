import 'dotenv/config';
import axios from 'axios';

const SLACK_API = process.env.SLACK_API;
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_CHANNEL_NAME = process.env.SLACK_CHANNEL_NAME;

const sendMessage = async (text) => {
    const message = { text };
    try {
        await axios.post(SLACK_API, message);
        console.log('Message sent to Slack');
    } catch (error) {
        console.error('Error sending message to Slack:', error);
        throw error;
    }
};
