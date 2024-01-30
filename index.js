const http = require('http');
const cron = require('node-cron');
const SlackController = require('./controllers/slack');
const AsanaController = require('./controllers/asana');

const slackController = new SlackController();
const asanaController = new AsanaController(slackController);

cron.schedule('* * * * *', () => { // пока раз в минуту для теста
  asanaController.getTasksFromSection(process.env.WORKSPACE_GID);
});

const server = http.createServer();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
