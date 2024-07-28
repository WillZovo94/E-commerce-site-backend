const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const category = await Category.findAll({ include: [Product] });
    res.json({ category, message: 'Accessing Categories' })
  } catch (err) {
    res.status(400).json(err);
  }
  }
);

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id, { include: [Product] });
    if (!category) {
      res.status(400).json({ message: 'Unable to find category' });
      return;
    } else {
      res.status(200).json(category);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: params.id
      },
    })
    if (!updateCategory) {
      res.status(400).json({ message: 'Unable to find the category.' });
      return;
    } else {
      res.status(200).json(updateCategory);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deleteCategory) {
      res.status(400).json({ message: 'Unable to find a category with that id' });
      return;
    } else {
      res.status(200).json(deleteCategory);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
