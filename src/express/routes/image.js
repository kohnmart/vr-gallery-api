import express from 'express';
import upload from '../middlewares/multer/upload.js';
import actionDatabase from '../../postgres-db/helper/request.js';
import fs from 'fs';
const image = express.Router();
image.use(express.json());

// GET ALL GALLERY IMAGES FROM A USER
image.get('/:id', async (req, res) => {
  const db = await actionDatabase({
    method: 'select',
    select: ['i_id', 'i_name'],
    table: 'getGalleryImages',
    idName: 'g_id',
    idValue: req.params.id,
  });
  res.status(db.status).json(db.result);
});

// ADD IMAGE TO GALLERY --> Upload to S3 Bucket
image.post(
  '/upload',
  upload.fields([{ name: 'image' }, { name: 'thumbnail' }]),
  async (req, res) => {
    const files = req.files;
    const imageId = files['image'][0].filename.split('.')[0];
    const imageName = files['image'][0].originalname;
    const thumbId = files['thumbnail'][0].filename.split('.')[0];
    const g_id = req.body.g_id;

    actionDatabase({
      method: 'select',
      select: ['i_id, i_thumb'],
      table: 'image',
      idName: ['g_id', 'i_frame'],
      idValue: [g_id, 'Frame02'],
    })
      .then((selectResult) => {
        if (selectResult.result.length !== 0) {
          console.log(selectResult.status);
          /* REPLACE => IMAGE AND THUMBNAIL IF EXISTS */
          actionDatabase({
            method: 'update',
            table: 'image',
            columns: ['i_id', 'i_name', 'i_thumb'],
            set: [imageId, imageName, thumbId],
            idName: ['g_id', 'i_frame'],
            idValue: [g_id, 'Frame01'],
          })
            .then((updateResult) => {
              /* UNLINK => EXISTING STORE IMAGES */
              fs.unlinkSync(`./store/${selectResult.result[0]['i_id']}.jpg`);
              fs.unlinkSync(`./store/${selectResult.result[0]['i_thumb']}.jpg`);
              return res.json(updateResult);
            })
            .catch((err) => {
              console.log(err);
              res.json(err);
            });
        } else {
          /* INSERT => NEW IMAGE AND THUMBNAIL TO GALLERY */
          const insert = actionDatabase({
            method: 'insert',
            table: 'image',
            columns: ['i_id', 'g_id', 'i_thumb', 'i_name', 'i_frame'],
            set: [imageId, g_id, thumbId, imageName, 'Frame01'],
            returningId: 'i_id',
          });
          return res.json(insert);
        }
      })
      .catch((err) => {
        // ERROR => DELETE UPLOADED IMAGES
        console.log('ERROR');
        fs.unlinkSync(`./store/${imageId}.jpg`);
        fs.unlinkSync(`./store/${thumbId}.jpg`);
        res.json(err);
      });
  }
);

export default image;
