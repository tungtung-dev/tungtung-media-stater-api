import jwt from "jsonwebtoken";
import config from "../../config";
import User from "../../models/user";
import {getToken, checkPermission} from "../middlewareUtils";

/**
 * Verify admin user authentication middleware
 * @param req user request
 * @param res response
 * @param next
 * @returns {*}
 */
function supperAdminMiddleware(req, res, next) {
    var token = getToken(req);
    if (token) {
        // Verify given token and get payload data
        jwt.verify(token, config.secret, (err, payload) => {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token'});
            } else {
                // Query admin user by payload data
                User.findOne({_id: payload._doc._id, superAdmin: true})
                    .select({password: 0})
                    .then(user => {
                        if (user) {
                            req.user = user;
                            req.token = token;
                            next();
                        } else {
                            return res.json({success: false, message: 'Admin user not found'});
                        }
                    });
            }
        });
    }
    else {
        return res.status(403).send({success: false, message: 'No token provided'});
    }
}


/**
 * Check create post permission middleware
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function viewPermissionMiddleware(req, res, next) {
    let action = 'view';
    let contentType = 'permission';
    var token = getToken(req);
    if (token) {
        checkPermission(token, action, contentType, (err, user) => {
            if (err) {
                return res.json({success: false, message: err.message});
            } else {
                req.user = user;
                req.token = token;
                next();
            }
        });
    } else {
        return res.status(403).send({success: false, message: 'No token provided'});
    }
}

/**
 * Check create post permission middleware
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function addPermissionMiddleware(req, res, next) {
    let action = 'add';
    let contentType = 'permission';
    var token = getToken(req);
    if (token) {
        checkPermission(token, action, contentType, (err, user) => {
            if (err) {
                return res.json({success: false, message: err.message});
            } else {
                req.user = user;
                req.token = token;
                next();
            }
        });
    } else {
        return res.status(403).send({success: false, message: 'No token provided'});
    }
}

/**
 * Check create post permission middleware
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function changePermissionMiddleware(req, res, next) {
    let action = 'change';
    let contentType = 'permission';
    var token = getToken(req);
    if (token) {
        checkPermission(token, action, contentType, (err, user) => {
            if (err) {
                return res.json({success: false, message: err.message});
            } else {
                req.user = user;
                req.token = token;
                next();
            }
        });
    } else {
        return res.status(403).send({success: false, message: 'No token provided'});
    }
}

/**
 * Check create post permission middleware
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function deletePermissionMiddleware(req, res, next) {
    let action = 'delete';
    let contentType = 'permission';
    var token = getToken(req);
    if (token) {
        checkPermission(token, action, contentType, (err, user) => {
            if (err) {
                return res.json({success: false, message: err.message});
            } else {
                req.user = user;
                req.token = token;
                next();
            }
        });
    } else {
        return res.status(403).send({success: false, message: 'No token provided'});
    }
}

export {
    supperAdminMiddleware,
    viewPermissionMiddleware,
    addPermissionMiddleware,
    changePermissionMiddleware,
    deletePermissionMiddleware
}

export default {supperAdminMiddleware}
