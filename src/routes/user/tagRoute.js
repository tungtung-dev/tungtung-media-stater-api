/**
 * Created by Tien Nguyen on 8/7/16.
 */

import express from "express";
import {getAllTagsWithPagination} from "../../dao/tagDao";
import {getAllTagsWithoutPagination} from "../../dao/tagDao";
import {getTag} from "../../dao/tagDao";

var router = express.Router();

// Support api: /tags to get all tag with pagination info
// Support select tags by tag name, example /tags?tag_name=vật
router.get('/', function (req, res, next) {
    let paginationInfo = req.query;
    getAllTagsWithPagination(paginationInfo, (err, data) => {
        if (err) {
            res.json({success: false, message: err === null ? "Not found" : err.message});
        } else {
            res.json(data);
        }
    });
});

router.get('/without-pagination', function (req, res, next) {
    getAllTagsWithoutPagination((err, data) => {
        if (err) {
            res.json({success: false, message: err.message === null ? "Unknown err" : err.message});
        } else {
            res.json(data);
        }
    });
});

router.get('/:tag', function (req, res, next) {
    let tag = req.params.tag;
    let isValid = ObjectId.isValid(tag);
    let queryObj = isValid ? {_id: tag} : {slug: tag};
    getTag(queryObj, (err, data) => {
        if (err || data === null) {
            res.json({success: false, message: data === null ? "Not found" : err.message});
        } else {
            res.json(data);
        }
    });
});

export default router;