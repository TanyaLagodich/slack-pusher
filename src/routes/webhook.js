import { handleGitlabEvent } from '../services/gitlabService.js';

const webhookRoute = async (fastify) => {
    fastify.post('/gitlab', async (request, reply) => {
        const gitlabEvent = request.body;

        try {
            await handleGitlabEvent(gitlabEvent);
            reply.status(200).send('Event received');
        } catch (error) {
            console.error('Error processing event:', error);
            reply.status(500).send('Error processing event');
        }
    })
}

export default webhookRoute;
