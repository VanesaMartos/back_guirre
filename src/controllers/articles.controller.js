const ArticleModel = require('../models/article.model');

const getAllArticles = async (req, res) => {
    try {
        const [result] = await ArticleModel.selectAll();
        res.json(result);
    } catch (error) {
        res.json({ error: error.message });
    }
}

const getAllPublished = async (req, res) => {
    try {
        const [result] = await ArticleModel.selectAllPublished();
        res.json(result);
    } catch (error) {
        res.json({ error: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const { articleId } = req.params;
        const [result] = await ArticleModel.selectById(articleId);
        if (result.length === 0) return res.json({ error: 'EL ID del artículo no existe.' });
        // const tagsArray = result[0].tags.split(',');
        // console.log(tagsArray);
        res.json(result[0]);
    } catch (error) {
        console.log(error);
        res.json({ error: error.message });
    }
}

const getByUser = async (req, res) => {
    try {
        const [result] = await ArticleModel.selectByUser(req.user.id);
        res.json(result);
    } catch (error) {
        res.json({ error: error.message });
    }
}

const getByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const [result] = await ArticleModel.selectByCategory(category);
        res.json(result)
    } catch (error) {
        res.json({ error: error.message });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const [result] = await ArticleModel.selectAllCategories();
        res.json(result);
    } catch (error) {
        res.json({ error: error.message });
    }
}

const createArticle = async (req, res) => {
    try {
        const { title, excerpt, body, tags, status, category_id, url, source, caption } = req.body;
        const creator_id = req.user.id;
        const author_name = req.user.name;
        const [result] = await ArticleModel.insert({ author_name, title, excerpt, body, tags, status, category_id, creator_id });
        const [image] = await ArticleModel.insertImage({ url, source, caption });
        const [article] = await ArticleModel.selectById(result.insertId);
        res.json(article[0]);
    } catch (error) {
        res.json({ error: error.message });
    }
}

const updateArticle = async (req, res) => {
    try {
        const { articleId } = req.params;
        const [result] = await ArticleModel.updateArticle(articleId, req.body);
        const [article] = await ArticleModel.selectById(articleId);
        res.json(article[0]);
    } catch (error) {
        res.json({ error: error.message });
    }
}

const deleteArticle = async (req, res) => {
    try {
        const { articleId } = req.params;
        const [article] = await ArticleModel.selectById(articleId);
        await ArticleModel.deleteArticle(articleId);
        res.json(article[0]);
    } catch (error) {
        res.json({ error: error.message });
    }
}

module.exports = { getAllArticles, createArticle, getById, updateArticle, deleteArticle, getByUser, getByCategory, getAllCategories, getAllPublished };