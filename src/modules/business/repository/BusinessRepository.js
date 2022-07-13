import BusinessModel from "../model/BusinessModel.js";
import ApiException from '../../../../../../common/exceptions/ApiException.js';
import logger from '../../../../../../common/functions/logger.js';
import { HTTP_CODE, LOG_LEVEL } from "../../../../../../common/constants/main.js";

class BusinessRepository {
    async findAll() {
        try {
            logger(LOG_LEVEL.LOG_INFO, "Running BusinessRepository::findAll");        
            return await BusinessModel.findAll();
        } catch (error) {
            logger(LOG_LEVEL.LOG_ERR, `ERROR - ${error.message}`);
            throw new ApiException(
                HTTP_CODE.INTERNAL_SERVER_ERROR,
                error.message
            );
        }
    }

    async findByID(id) {
        try {
            logger(LOG_LEVEL.LOG_INFO, "Running BusinessRepository::findByID");
            return await BusinessModel.findByPk(id)
        } catch (error) {
            logger(LOG_LEVEL.LOG_ERR, `ERROR - ${error.message}`);
            throw new ApiException(
                HTTP_CODE.INTERNAL_SERVER_ERROR,
                error.message
            );
        }
    }

    async create(body) {
        try {
            await BusinessModel.create(body, {
                include: [{
                    association: BusinessModel.Responsible,
                    as: 'responsible'
                }]
            });
        } catch (error) {
            let msg = error.original ? error.original.sqlMessage : error.message;
            logger(LOG_LEVEL.LOG_ERR, `ERROR - ${msg}`);
            throw new ApiException(
                HTTP_CODE.INTERNAL_SERVER_ERROR,
                msg
            );
        }
    }

    async updateBy(object, body) {
        try {
            logger(LOG_LEVEL.LOG_INFO, "Running BusinessRepository::updateBy");
            const result = await BusinessModel.update(body, {
                where: object
            });

            return result;
        } catch (error) {
            logger(LOG_LEVEL.LOG_ERR, `ERROR - ${error.message}`);
            throw new ApiException(
                HTTP_CODE.INTERNAL_SERVER_ERROR,
                error.message
            );
        }
    }

    async updateByCNPJ(cnpj, body) {
        try {
            logger(LOG_LEVEL.LOG_INFO, "Running BusinessRepository::updateByCNPJ");
            const result = await BusinessModel.update(body, { where: { cnpj: cnpj }});
            return result;
        } catch (error) {
            logger(LOG_LEVEL.LOG_ERR, `ERROR - ${error.message}`);
            throw new ApiException(
                HTTP_CODE.INTERNAL_SERVER_ERROR,
                error.message
            );
        }
    }

    async deleteByID(id) {
        try {
            logger(LOG_LEVEL.LOG_INFO, "Running BusinessRepository::deleteByID");
            const result = await BusinessModel.destroy({ where: { id_business: id }});
            return result;
        } catch (error) {
            logger(LOG_LEVEL.LOG_ERR, `ERROR - ${error.message}`);
            throw new ApiException(
                HTTP_CODE.INTERNAL_SERVER_ERROR,
                error.message
            );
        }
    }
}

export default new BusinessRepository();