const fastify = require('fastify')({ logger: true });
const routes = require('./routers');


fastify.register(routes);

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
// Экспортируем функцию для запуска сервера
module.exports = start;

