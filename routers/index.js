const AsanaController = require('../controllers/asana.controller');
const SlackController = require('../controllers/slack.controller');

const slackController = new SlackController();
const asanaController = new AsanaController(slackController);
async function routes(fastify) {
    fastify.get('/asana/section-tasks/:sectionID', asanaController.getTasksFromSection.bind(asanaController));
}

module.exports = routes;