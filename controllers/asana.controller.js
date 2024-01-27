const AsanaApi = require('../api/asana');

class AsanaController {
    constructor(slackController) {
        console.log({ slackController });
        this.slackController = slackController;
    }

    async getTasksFromSection(req, reply) {
        console.log('getTasksFromSection');
        let tasks = await AsanaApi.getTaskFromSection(req.params.sectionID);

        const tasksDetails = await Promise.all(tasks.map(async ({ gid }) => {
            const task = await AsanaApi.getTaskByID(gid);
            return {
                gid: task.gid,
                name: task.name,
                notes: task.notes,
            };
        }));
        console.log({ tasks }, this.slackController);
        await this.slackController.sendMessageToChannel(tasksDetails);
        reply.send('Hi');
    }
}

module.exports = AsanaController;
