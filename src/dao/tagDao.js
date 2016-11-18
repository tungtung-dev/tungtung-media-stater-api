/**
 * Created by Tien Nguyen on 11/18/16.
 */
import {Tag} from '../models/index';
import slug from 'slug';

/**
 * Save new tag if it is not exist
 * @param tag
 * @returns {*}
 */
async function saveTagIfNeeded(tag) {
    let slugged_tag = slug(tag);
    try {
        await Tag.update({slug: slugged_tag}, {
            $set: {
                updated_at: new Date()
            },
            $setOnInsert: {
                tag_name: tag,
                slug: slugged_tag,
                created_at: new Date()
            }
        }, {upsert: true}).exec();
        let result = await Tag.findOne({slug: slugged_tag}).exec();
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
    let tag_ids = [];
    for (let i = 0; i < tags.length; i++) {
        let tag_id = await saveTagIfNeeded(tags[i]);
        if (tag_id !== null) {
            tag_ids.push(tag_id);
        }
    }
    return tag_ids;
}

export {saveTagIfNeeded, saveTags}
export default {saveTagIfNeeded, saveTags}