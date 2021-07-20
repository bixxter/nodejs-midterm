const express = require('express');
const blogControllers = require('../controllers/blogControllers');
const upload = require('../middleware/multer');
const router = express.Router();

router.get('/', blogControllers.blog_index);
router.post('/', upload.single('image'), blogControllers.blog_create_post);
// router.get('/create', blogControllers.blog_create_get);
router.get('/:id', blogControllers.blog_details);
router.delete('/:id', blogControllers.blog_delete_post);

module.exports = router;
