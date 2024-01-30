require('dotenv').config();
const http = require('http');
const cron = require('node-cron');
const SlackController = require('./controllers/slack');
const AsanaController = require('./controllers/asana');

const slackController = new SlackController();
const asanaController = new AsanaController(slackController);

const MINUTES = process.env.CRON_MINUTES || 1;
const CRON_EXPRESSION = `*/${MINUTES} * * * *`;

cron.schedule(CRON_EXPRESSION, () => { // пока раз в минуту для теста
  asanaController.getTasksFromSection(process.env.WORKSPACE_GID);
});

const server = http.createServer();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
