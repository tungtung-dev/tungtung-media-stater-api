/**
 * Created by Tien Nguyen on 11/18/16.
 */
import {Tag} from '../models/index';
import slug from 'slug';
import Pagination from 'pagination-js';

/**
 * Save new tag if it is not exist
 * @param tag
 * @returns {*}
 */
async function saveTagIfNeeded(tag) {
    let sluggedTag = slug(tag);
    try {
        await Tag.update({slug: sluggedTag}, {
            $set: {
                updatedAt: new Date()
            },
            $setOnInsert: {
                tagName: tag,
                slug: sluggedTag,
                createdAt: new Date()
            }
        }, {upsert: true}).exec();
        let result = await Tag.findOne({slug: sluggedTag}).exec();
        return result._id;
    } catch (err) {
        return null;
    }
}

/**
 * Save Array of Tag
 * @param tags
 * @returns {Array}
 */
async function saveTags(tags) {
    let tagIds = [];
    for (let i = 0; i < tags.length; i++) {
        let tagId = await saveTagIfNeeded(tags[i]);
        if (tagId !== null) {
            tagIds.push(tagId);
        }
    }
    return tagIds;
}

/**
 * Get tags with pagination by query
 * @param queryObj query object: ex: {}, {_id: "123"}
 * @param paginationInfo include item_per_page and page information to get pagination data
 * @param callback
 */
function getTagsWithPagination(queryObj, paginationInfo, callback) {
    (async() => {
        try {
            let count = await Tag.count(queryObj).exec();
            let pagination = (new Pagination(paginationInfo, count)).getPagination();
            Tag.find(queryObj)
                .skip(pagination.minIndex)
                .limit(pagination.itemPerPage)
                .exec((err, data) => {
                    callback(err, {data, pagination});
                });
        } catch (err) {
            callback(err);
        }
    })();
}

/**
 * Get all tags with pagination
 * @param paginationInfo include item_per_page and page information to get pagination data
 * @param callback
 */
function getAllTagsWithPagination(paginationInfo, callback) {
    let queryObj = {};
    getTagsWithPagination(queryObj, paginationInfo, callback);
}

/**
 * getTagsByTagSlugs
 * @param tagSlugs
 * @returns {Promise}
 */
async function getTagsByTagSlugs(tagSlugs) {
    console.log("tagSlugs: " + tagSlugs.length);
    return await Tag.find({slug: {$in: tagSlugs}})
        .exec();
}

export {saveTagIfNeeded, saveTags, getAllTagsWithPagination, getTagsByTagSlugs}
export default {saveTagIfNeeded, saveTags, getAllTagsWithPagination, getTagsByTagSlugs}