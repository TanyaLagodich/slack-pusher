const AsanaApi = require('../api/asana');
const trimText = require('../utils/trimText');

class AsanaController {
    constructor(slackController) {
        this.slackController = slackController;
    }

    async getTasksFromSection(sectionID) {
        let tasks = await AsanaApi.getTaskFromSection(sectionID);

        const tasksDetails = await Promise.all(tasks.map(async ({ gid }) => {
            const task = await AsanaApi.getTaskByID(gid);
            return {
                gid: task.gid,
                name: task.name,
                notes: trimText(task.notes),
                permalink_url: task.permalink_url,
            };
        }));
        await this.slackController.sendMessageToChannel(tasksDetails);
    }
}

module.exports = AsanaController;
