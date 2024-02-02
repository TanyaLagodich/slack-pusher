const AsanaApi = require('../api/asana');
const trimText = require('../utils/trimText');
const logger = require("../logger");

class Asana {
  constructor(slackController) {
    this.slackController = slackController;
  }

  async getTasksFromSection(sectionID) {
    try {
      const { data: { data: tasks } } = await AsanaApi.getTaskFromSection(sectionID);
      await this.slackController.pushInSlack(tasks);

      // const tasksDetails = await Promise.all(tasks.map(async ({ gid }) => {
      //   const { data: { data: task }} = await AsanaApi.getTaskByID(gid);
      //   return {
      //     gid: task.gid,
      //     name: task.name,
      //     notes: trimText(task.notes),
      //     permalink_url: task.permalink_url,
      //   };
      // }));
      // await this.slackController.sendMessageToChannel(tasksDetails);
    } catch (err) {
      logger.log('error', JSON.stringify(err));
    }
  }
}

module.exports = Asana;
