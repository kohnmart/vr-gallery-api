import express from 'express';
import actionDatabase from '../../postgres-db/helper/request.js';
const galleries = express.Router();
galleries
  .route('/')

  // GET ALL ACTIVE GALLERIES
  .get(async (req, res) => {
    const db = await actionDatabase({
      method: 'select',
      select: ['g_id', 'g_name', 'g_date'],
      table: 'getUserGalleries',
      idName: ['g_active'],
      idValue: ['true'],
    });
    res.status(db.status).json({ Gallery: db.result });
  })

  // CREATE NEW GALLERY
  .post(async (req, res) => {
    const post = req.body;
    const db = await actionDatabase({
      method: 'insert',
      table: 'gallery',
      columns: ['u_id', 'g_name', 'g_active'],
      set: [post.u_id, post.g_name, post.g_active],
      returningId: 'g_id',
    });
    res.status(db.status).json(db.result);
  })

  // UPDATE SPECIFIC GALLERY COLUMN
  .put(async (req, res) => {
    const db = await actionDatabase({
      method: 'update',
      table: 'gallery',
      columns: 'g_active',
      idName: ['g_id', 'u_id'],
      idValue: req.body.ids,
      set: req.body.set,
    });
    res.status(db.status).json(db.result);
  })

  // DELETE GALLERY CASCADING IMAGES TABLE
  .delete(async (req, res) => {
    const db = await actionDatabase({
      method: 'delete',
      table: 'gallery',
      idName: ['g_id', 'u_id'],
      idValue: [req.query.g_id, req.query.u_id],
    });
    res.status(db.status).json(db.result);
  });

// GET ALL USER GALLERIES WITH ID
galleries.get('/:id', async (req, res) => {
  const db = await actionDatabase({
    method: 'select',
    select: ['g_name', 'g_date', 'g_rating', 'g_active'],
    table: 'getUserGalleries',
    idName: 'u_id',
    idValue: req.params.id,
  });
  res.status(db.status).json(db.result);
});
export default galleries;
