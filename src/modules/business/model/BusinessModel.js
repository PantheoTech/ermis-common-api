import ResponsibleModel from '../../responsible/model/ResponsibleModel.js';
import { DataTypes } from 'sequelize';
import db from '../../../config/db/dbConfig.js';

const BusinessModel = db.define('tbl_business', {
    id_business: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cnpj: {
        type: DataTypes.CHAR,
        allowNull: false,
        unique: true,
        validate: {
            len: 14
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 200
        }
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 100
        }
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 100
        }
    },
    state: {
        type: DataTypes.CHAR,
        allowNull: false,
        validate: {
            max: 2
        }
    },
    complement: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            max: 150
        }
    }
});

ResponsibleModel.hasOne(BusinessModel, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: 'id_responsible'
});
BusinessModel.Responsible = BusinessModel.belongsTo(ResponsibleModel, {
    as: 'responsible',
    foreignKey: 'id_responsible'
});

export default BusinessModel;
