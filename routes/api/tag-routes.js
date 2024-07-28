const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({ include: [Product] });
    res.json({ tags, message: 'Accessing Product Tags' });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tag = await Tag.findByPk(req.params.id, { include: [Product] });
    if (!tag) {
      res.status(400).json({ message: 'Unable to find a tag with that ID' });
      return;
    } else {
      res.status(200).json(tag);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const createTag = await Tag.create(req.body);
    res.status(200).json(createTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      },
    })
    // may need to see if there is no id.
    if (!updateTag) {
      res.status(400).json({ message: 'Unable to find a tag with that ID'});
        return;
    } else {
      res.status(200).json(updateTag);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({ 
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTag) {
      res.status(400).json({ message: 'Unable to find a tag with that ID'});
    } else {
      res.status(200).json(deleteTag);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
