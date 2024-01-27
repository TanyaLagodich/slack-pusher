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

    async getTaskFromSection(sectionID) {
        const { data } = await this.get({ endpoint: `sections/${sectionID}/tasks` });
        return data.data;
    }

    async getTaskByID(taskID) {
        const { data } = await this.get({ endpoint: `tasks/${taskID}` });
        return data.data;
    }
}

module.exports = new AsanaApi();