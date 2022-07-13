import { LOG_LEVEL } from '../../../../../common/constants/main.js';
import logger from '../../../../../common/functions/logger.js';

export default function middlewareLogger(req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    logger(LOG_LEVEL.LOG_INFO, `Endpoint called: ${req.path} - IP: ${ip}`);
    if (req.body) {
        logger(LOG_LEVEL.LOG_INFO, `Body Request: ${JSON.stringify(req.body)}`);
    }
    next();
}