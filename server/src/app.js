const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/post');
const { authMiddleware } = require('./utils/auth');

const app = express();
app.use(express.json());

// Basic error handler helper
function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Routes
// Create Post (auth required)
app.post(
  '/api/posts',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const post = await Post.create({
      title,
      content,
      category,
      author: req.user.id,
      slug: `${title.toLowerCase().replace(/\s+/g, '-')}-${new mongoose.Types.ObjectId().toString().slice(-6)}`,
    });

    return res.status(201).json({
      _id: post._id,
      title: post.title,
      content: post.content,
      author: post.author.toString(),
      category: post.category.toString(),
      slug: post.slug,
    });
  })
);

// Get Posts (with optional category filter and pagination)
app.get(
  '/api/posts',
  asyncHandler(async (req, res) => {
    const { page = 1, limit = 50, category } = req.query;
    const filter = {};
    if (category) filter.category = category;

    const posts = await Post.find(filter)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json(
      posts.map((p) => ({
        _id: p._id,
        title: p.title,
        content: p.content,
        author: p.author?.toString?.() || p.author,
        category: p.category?.toString?.() || p.category,
        slug: p.slug,
      }))
    );
  })
);

// Get Post by ID
app.get(
  '/api/posts/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).end();
    }
    const post = await Post.findById(id);
    if (!post) return res.status(404).end();
    res.json({
      _id: post._id,
      title: post.title,
      content: post.content,
      author: post.author?.toString?.() || post.author,
      category: post.category?.toString?.() || post.category,
      slug: post.slug,
    });
  })
);

// Update Post (must be author)
app.put(
  '/api/posts/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body || {};
    const post = await Post.findById(id);
    if (!post) return res.status(404).end();
    if (post.author.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    if (updates.title === '') return res.status(400).json({ error: 'Validation failed' });
    Object.assign(post, updates);
    await post.save();
    res.json({
      _id: post._id,
      title: post.title,
      content: post.content,
      author: post.author.toString(),
      category: post.category.toString(),
      slug: post.slug,
    });
  })
);

// Delete Post (must be author)
app.delete(
  '/api/posts/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.status(404).end();
    if (post.author.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await post.deleteOne();
    res.json({ success: true });
  })
);

// Global error handler (debugging technique)
app.use((err, req, res, next) => {
  // Basic logging - could be enhanced
  // eslint-disable-next-line no-console
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
