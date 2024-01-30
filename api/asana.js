require('dotenv').config();
const HttpApi = require('./httpApi');

const ASANA_API = 'https://app.asana.com/api/1.0/';

class AsanaApi extends HttpApi {
  constructor() {
    super({
      baseURL: ASANA_API,
      headers: {
        Authorization: `Bearer ${process.env.ASANA_TOKEN}`,
      },
    });
  }

  getTaskFromSection(sectionID) {
    return this.get({ endpoint: `sections/${sectionID}/tasks` });
  }

  getTaskByID(taskID) {
    return this.get({ endpoint: `tasks/${taskID}` });
  }
}

module.exports = new AsanaApi();
