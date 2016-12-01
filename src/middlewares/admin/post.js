import {checkPermission} from "../middlewareUtils";
import {getToken} from "../middlewareUtils";
import {processResult} from "../middlewareUtils";
/**
 * Created by Tien Nguyen on 11/26/16.
 */

/**
 * Check view post permission middleware
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function viewPostMiddleware(req, res, next) {
    let action = 'view';
    let contentType = 'post';
    var token = getToken(req);
    checkPermission(token, action, contentType, (err, user) => {
        processResult(err, user, token, req, res, next);
    });
}

/**
 * Check create post permission middleware
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function createPostMiddleware(req, res, next) {
    let action = 'add';
    let contentType = 'post';
    var token = getToken(req);
    checkPermission(token, action, contentType, (err, user) => {
        processResult(err, user, token, req, res, next);
    });
}

/**
 * Check edit post permission middleware
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function editPostMiddleware(req, res, next) {
    let action = 'change';
    let contentType = 'post';
    var token = getToken(req);
    checkPermission(token, action, contentType, (err, user) => {
        processResult(err, user, token, req, res, next);
    });
}

/**
 * Check edit post permission middleware
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function deletePostMiddleware(req, res, next) {
    let action = 'delete';
    let contentType = 'post';
    var token = getToken(req);
    checkPermission(token, action, contentType, (err, user) => {
        processResult(err, user, token, req, res, next);
    });
}

export {viewPostMiddleware, createPostMiddleware, editPostMiddleware, deletePostMiddleware}