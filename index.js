const http = require('http');
const cron = require('node-cron');
const SlackController = require('./controllers/slack.controller');
const AsanaController = require('./controllers/asana.controller');

const slackController = new SlackController();
const asanaController = new AsanaController(slackController);

cron.schedule('* * * * *', () => { // пока раз в минуту для теста
  asanaController.getTasksFromSection(process.env.WORKSPACE_GID);
});

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
