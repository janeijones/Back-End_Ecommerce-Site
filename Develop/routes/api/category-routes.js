const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
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
      return
    } else {
      //find all categories
      res.status(200).json(findAllCategories)
    }
  } catch (err) {

    //error handling
    res.status(500).json(err)
  }

});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({ where: { id: req.params.id}}).then((delete))
});

module.exports = router;
