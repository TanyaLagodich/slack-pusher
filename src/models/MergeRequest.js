import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const MergeRequest = sequelize.define('MergeRequest', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    processed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: true,
});

export default MergeRequest;
