const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  //Category.findAll();
try {
    const findAllCategories = await Category.findAll({
      include: {
        model: Product,
      },
      attributes: [
        'id',
        'category_name'
      ]
    })

    if (!findAllCategories){ //if cannot find all categories 
      res.status(404).json({
        message: 'Categories not found!'
      })
      return;
    } else {
      //find all categories
      res.status(200).json(findAllCategories)
    }
  } catch (err) {
    //error handling
    res.status(500).json(err)
  }
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const findCategory = await Category.findByPk( req.params.id, {
      include: {
        model: Product,
      },
    })
    //if cannot find category
    if (!findCategory){
      res.status(404).json({
        message: 'Category cannot be found!'
      })
      return;
    } else {

      // find category
      res.status(200).json(findCategory)
    }
  } catch (err) {

    // Error response
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create({
      category_name: req.body.category_name
    })

    //if successful, create category
    res.status(200).json(createCategory)
  } catch (err) {
    //error handling
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    // update a category by its `id` value
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    //if category cannot be updated
    if (!updateCategory){
      res.status(404).json({
        message: 'Category cannot be updated!'
      })
      return;
    } else {
      //else, update category
      res.status(200).json(updateCategory)
    }
  } catch (err) {
    // Error handling
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      }
    })

    //if cannot delete category
    if (!deleteCategory){
      res.status(404).json({
        message: 'Category cannot be deleted!'
      })
      return;
    } else {
      //succesfully delete category
      res.status(200).json(deleteCategory)
    }
  } catch (err) {

    // Error handling
    res.status(500).json(err)
  }
});

module.exports = router;
