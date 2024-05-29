import Fastify from 'fastify';
import webhookRoute from './routes/webhook.js';
import initDatabase from './initDatabase.js';

const fastify = Fastify({
    logger: true
});

fastify.register(webhookRoute, { prefix: '/webhook' });

export const start = async () => {
    try {
        await initDatabase();
        await fastify.listen({ port: process.env.PORT, host: '0.0.0.0' });
        console.log(`Server is running on port ${process.env.PORT}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
