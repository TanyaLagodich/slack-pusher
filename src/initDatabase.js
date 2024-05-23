import sequelize from './config/database.js';
import MergeRequest from './models/MergeRequest.js';

const initDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ force: false }); // force: true перезапишет таблицы при каждом запуске
        console.log('Database synced');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default initDatabase;
