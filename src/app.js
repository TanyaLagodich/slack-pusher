import Fastify from 'fastify';
import webhookRoute from './routes/webhook.js';
import initDatabase from './initDatabase.js';

const fastify = Fastify({
    logger: true
});

const terminate = (server, options = { coredump: false, timeout: 500 }) => {
    const exit = code => {
        options.coredump ? process.abort() : process.exit(code)
    }

    return (code, reason) => async (err, promise) => {
        if (err && err instanceof Error) {
            console.log(err.message, err.stack)
        }

        server.close(exit)
        setTimeout(exit, options.timeout).unref()
    }
}

fastify.register(webhookRoute, { prefix: '/webhook' });

export const start = async () => {
    try {
        await initDatabase();
        await fastify.listen({ port: process.env.PORT, host: '0.0.0.0' })
        const exitHandler = terminate(fastify, {
            coredump: false,
            timeout: 500
        });

        process.on('uncaughtException', exitHandler(1, 'Unexpected Error'))
        process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'))
        process.on('SIGTERM', exitHandler(0, 'SIGTERM'))
        process.on('SIGINT', exitHandler(0, 'SIGINT'))

        console.log(`Server is running on port ${process.env.PORT}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
