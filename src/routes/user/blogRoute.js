/**
 * Created by Tien Nguyen on 11/18/16.
 */
import express from "express";
import authMiddleware from "../../middlewares/authMiddleware";
import {getBlogBySlug, saveBlog, deleteBlogBySlug, getBlogsByTagsWithPagination} from "../../dao/blogDao";
import url from "url";
import slug from "slug";
import {makeId} from "common-helper";
import {updateBlog} from "../../dao/blogDao";

var route = express.Router();

route.get('/', (req, res) => {
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;
    let tag_slugs = query.tag_slugs !== undefined ? query.tag_slugs.split(",") : [];
    let keyword = query.keyword !== undefined ? query.keyword : "";
    getBlogsByTagsWithPagination(keyword, tag_slugs, query, (err, data) => {
        if (err) {
            res.json({success: false, message: err === null ? "Not found" : err.message});
        } else {
            res.json(data);
        }
    });
});

route.post('/', authMiddleware, (req, res) => {
    let tags = req.body.tags === undefined ? [] : req.body.tags;
    let title = req.body.title === undefined ? "untitled" : req.body.title;
    let slug_title = slug(req.body.title) + "-" + makeId();
    let search_field = slug(req.body.title);
    let description = req.body.description;
    let content = req.body.content;
    let data = {title: title, slug: slug_title, description: description, content: content, search_field: search_field};
    saveBlog(req.user._id, data, tags, (err, data) => {
        if (err) {
            res.json({success: false, message: err === null ? "Not found" : err.message});
        } else {
            res.json(data);
        }
    })
});

route.get('/:blog_slug', (req, res) => {
    var {blog_slug} = req.params;
    getBlogBySlug(blog_slug, (err, data) => {
        if (err || data === null) {
            res.json({success: false, message: err === null ? "Not found" : err.message});
        } else {
            res.json(data);
        }
    });
});

route.put('/:blog_slug', (req, res) => {
    var {blog_slug} = req.params;
    let tags = req.body.tags === undefined ? [] : req.body.tags;
    let title = req.body.title === undefined ? "untitled" : req.body.title;
    let description = req.body.description;
    let search_field = slug(req.body.title, " ");
    let content = req.body.content;
    let data = {title: title, description: description, content: content, search_field: search_field, updated_at: new Date()};
    updateBlog(blog_slug, data, tags, (err, data) => {
        if (err || data === null) {
            res.json({success: false, message: err === null ? "Not found" : err.message});
        } else {
            res.json(data);
        }
    });
});

route.delete('/:blog_slug', (req, res) => {
    var {blog_slug} = req.params;
    deleteBlogBySlug(blog_slug, (err, data) => {
        if (err || data === null) {
            res.json({success: false, message: err === null ? "Not found" : err.message});
        } else {
            res.json(data);
        }
    });
});


export default route;