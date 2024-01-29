const fastify = require('fastify')({ logger: true });
const cron = require('node-cron');
const SlackController = require("./controllers/slack.controller");
const AsanaController = require("./controllers/asana.controller");

const slackController = new SlackController();
const asanaController = new AsanaController(slackController);

cron.schedule('* * * * *', () => { // пока раз в минуту для теста
    asanaController.getTasksFromSection(process.env.WORKSPACE_GID);
});

const start = async (fastify, options) => {
    try {
        await fastify.listen({ port: 3000 });
        fastify.log.info(`Server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start(fastify)
module.exports = start;

